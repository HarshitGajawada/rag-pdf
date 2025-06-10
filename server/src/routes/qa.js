const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  askQuestion,
  getHistory,
  saveHistory
} = require('../controllers/qaController');

// Q&A routes
router.post('/ask', auth, askQuestion);
router.get('/history', auth, getHistory);
router.post('/history', auth, saveHistory);

module.exports = router; 