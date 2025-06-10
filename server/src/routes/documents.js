const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth, isAdmin } = require('../middleware/auth');
const {
  uploadDocument,
  getDocuments,
  deleteDocument
} = require('../controllers/documentController');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Document routes
router.post('/upload', auth, isAdmin, upload.single('pdf'), uploadDocument);
router.get('/', auth, getDocuments);
router.delete('/:id', auth, isAdmin, deleteDocument);

module.exports = router; 