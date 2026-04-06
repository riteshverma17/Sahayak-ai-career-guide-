const fs = require('fs');
const path = require('path');

const FAQ_FILE_PATH = path.join(__dirname, '../data/faq.json');

// Load FAQs from file
function loadFaqs() {
  try {
    const data = fs.readFileSync(FAQ_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading FAQ file:', error);
    return [];
  }
}

// Generate response based on keyword matching
function generateLocalResponse(message, history) {
  const faqs = loadFaqs();
  const lowerCaseMessage = message.toLowerCase();

  for (const faq of faqs) {
    for (const keyword of faq.keywords) {
      if (lowerCaseMessage.includes(keyword.toLowerCase())) {
        return faq.answer;
      }
    }
  }

  return "I'm sorry, I don't understand your question. Could you please rephrase it or ask something else?";
}

module.exports = { generateLocalResponse };