const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simple chat endpoint that provides helpful responses
router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty'
      });
    }

    const userMessage = message.toLowerCase();
    let reply = '';

    // Simple keyword-based responses (can be extended with actual AI later)
    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      reply = 'Hello! 👋 I\'m here to assist you. Ask me anything about career guidance, studies, or the Sahayak platform!';
    } else if (userMessage.includes('career')) {
      reply = '📚 I can help you explore career options! Visit the Assessment section to get personalized career suggestions based on your interests and marks.';
    } else if (userMessage.includes('assessment')) {
      reply = '📝 The Assessment feature helps you explore different career paths. Go to the Assessment page and fill out your information to get detailed career guidance!';
    } else if (userMessage.includes('profile')) {
      reply = '👤 You can manage your profile information in the Profile section. Update your personal details, preferences, and academic information there.';
    } else if (userMessage.includes('help') || userMessage.includes('support')) {
      reply = '🤝 I\'m here to help! You can ask me about:\n• Career guidance and exploration\n• Assessment process\n• Profile management\n• Academic advice\n\nWhat would you like to know?';
    } else if (userMessage.includes('how are you') || userMessage.includes('how do you')) {
      reply = 'I\'m doing great! Thanks for asking. 😊 I\'m always ready to assist you with your academic and career journey.';
    } else if (userMessage.includes('thank')) {
      reply = 'You\'re welcome! Happy to help. Is there anything else you\'d like to know? 😊';
    } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
      reply = 'Goodbye! 👋 Feel free to reach out anytime if you need help. Good luck with your studies!';
    } else if (userMessage.includes('interest') || userMessage.includes('interested')) {
      reply = '🎯 Great! During the assessment, you\'ll be asked about your interests. Select the areas that excite you the most, and I\'ll help provide suitable career paths.';
    } else if (userMessage.includes('marks') || userMessage.includes('grades')) {
      reply = '📊 Your marks are important for career guidance. In the Assessment section, you\'ll input your current marks, which helps generate personalized recommendations.';
    } else if (userMessage.includes('class') || userMessage.includes('10th') || userMessage.includes('12th')) {
      reply = '🎓 Your current class level helps determine your career exploration options. Are you in 10th or 12th? This helps tailor career suggestions for your stage.';
    } else if (userMessage.includes('stream') || userMessage.includes('science') || userMessage.includes('commerce') || userMessage.includes('arts')) {
      reply = '📚 Your stream choice is crucial for career planning! Different streams lead to different career paths. Make sure you choose based on your interests and strengths.';
    } else {
      // Default helpful response
      reply = '🤔 That\'s a great question! While I\'m still learning, here\'s what I recommend:\n\n1. Explore the Assessment section for career guidance\n2. Check your Profile to keep information updated\n3. Review different career paths based on your interests\n\nIs there anything specific I can help you with?';
    }

    res.json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while processing your message'
    });
  }
});

module.exports = router;
