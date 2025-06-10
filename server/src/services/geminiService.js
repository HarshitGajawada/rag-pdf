const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the embedding model
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

// Initialize the text generation model
const textModel = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateEmbedding(text) {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

async function generateAnswer(question, context) {
  try {
    const prompt = `
      Context: ${context}
      
      Question: ${question}
      
      Please provide a clear and concise answer based on the given context. If the context doesn't contain enough information to answer the question, please say so.
    `;

    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating answer:', error);
    throw error;
  }
}

module.exports = {
  generateEmbedding,
  generateAnswer
}; 