const mongoose = require('mongoose');

const qaHistorySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  context: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QaHistory', qaHistorySchema); 