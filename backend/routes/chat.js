const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateLocalResponse } = require('../services/localChatService');

// Advanced chat endpoint using local keyword matching
router.post('/', auth, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty'
      });
    }

    // Call local matching logic
    const recentHistory = (history || []).slice(-10);
    const aiReply = generateLocalResponse(message, recentHistory);

    res.json({
      success: true,
      reply: aiReply
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while answering your question. Please try again later.'
    });
  }
});

module.exports = router;
