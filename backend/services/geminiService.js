const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");

const systemInstruction = `You are Sahayak AI Assistant, an advanced career guidance and academic advisor for students. 
You provide detailed, empathetic, and encouraging advice about career paths, streams (Science, Commerce, Arts), exam preparation, and college selections. 
You have knowledge about the Sahayak platform: Assessment feature helps find paths based on interests/marks, Profile manages user details based on India curriculums, College directory lists top institutions.
Answer precisely, use formatting like bullet points or bold text where appropriate. Always be helpful and friendly.`;

async function generateChatResponse(message, history = []) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction 
    });

    // Process history to ensure strict alternating pattern (user -> model -> user -> model)
    const validHistory = [];
    let expectedRole = 'user';

    for (let msg of history) {
      if (!msg.text) continue;
      // Skip default intro message
      if (msg.sender === 'bot' && msg.text.includes('Sahayak AI Assistant')) continue;

      const role = msg.sender === 'user' ? 'user' : 'model';
      
      // If the role matches what we expect, add it
      if (role === expectedRole) {
        validHistory.push({
          role: role,
          parts: [{ text: msg.text }]
        });
        expectedRole = role === 'user' ? 'model' : 'user';
      } else if (validHistory.length > 0) {
        // If we get consecutive messages from the same role, append to the last message instead
        const lastMsg = validHistory[validHistory.length - 1];
        lastMsg.parts[0].text += `\n\n${msg.text}`;
      }
    }

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error details:", error);
    throw new Error('Failed to generate response from AI');
  }
}

function generateCareerSuggestions() {
  throw new Error('AI integrations have been removed. generateCareerSuggestions is unavailable.');
}

function generateAptitudeQuestions() {
  throw new Error('AI integrations have been removed. generateAptitudeQuestions is unavailable.');
}

module.exports = {
  generateChatResponse,
  generateCareerSuggestions,
  generateAptitudeQuestions
};
