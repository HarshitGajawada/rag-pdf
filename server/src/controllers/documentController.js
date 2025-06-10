const Document = require('../models/Document');
const axios = require('axios');

// Upload and process PDF
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create form data for Python service
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Send to Python service for processing
    const ragResponse = await axios.post(
      `${process.env.RAG_SERVICE_URL}/api/rag/process-pdf`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${req.headers.authorization}`
        }
      }
    );

    // Create document in MongoDB
    const document = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      chunks: ragResponse.data.chunks,
      vectorStorePath: ragResponse.data.vector_store_path,
      uploadedBy: req.user._id
    });

    await document.save();

    res.status(201).json({
      message: 'Document uploaded and processed successfully',
      document
    });
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ message: 'Error processing document', error: error.message });
  }
};

// Get all documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .select('-chunks.text')
      .populate('uploadedBy', 'name email');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Delete from Python service
    await axios.delete(
      `${process.env.RAG_SERVICE_URL}/api/rag/document/${document._id}`,
      {
        headers: {
          'Authorization': `Bearer ${req.headers.authorization}`
        }
      }
    );

    // Delete document from MongoDB
    await document.deleteOne();

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument
}; 