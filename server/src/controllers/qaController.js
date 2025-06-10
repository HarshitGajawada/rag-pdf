const Chat = require("../models/Chat");

// Save a new chat (question/answer)
const saveHistory = async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) return res.status(400).json({ error: "Missing question or answer" });
  const chat = new Chat({ user: req.user.id, question, answer });
  await chat.save();
  res.json(chat);
};

// Get chat history for logged-in user
const getHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
};

// (Optional) Ask question endpoint placeholder
const askQuestion = async (req, res) => {
  res.status(501).json({ message: 'Not implemented. Use the Python backend for Q&A.' });
};

module.exports = {
  askQuestion,
  getHistory,
  saveHistory
}; 