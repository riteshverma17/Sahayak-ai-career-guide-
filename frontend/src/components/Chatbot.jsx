import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! 👋 I\'m your Sahayak AI Assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };
    
    // Prepare history payload for AI (exclude the initial greeting if desired, but here we'll send it)
    const historyPayload = messages.map(msg => ({ sender: msg.sender, text: msg.text }));
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ message: inputValue, history: historyPayload })
      });

      const data = await response.json();
      
      if (data.success) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.reply,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Sorry, I encountered an issue. Please try again.',
          sender: 'bot'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I\'m having trouble connecting. Please check your connection.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      { id: 1, text: 'Hello! 👋 I\'m your Sahayak AI Assistant. How can I help you today?', sender: 'bot' }
    ]);
  };

  return (
    <>
      {/* Chat Widget Container */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {/* Chat Window */}
        {isOpen && (
          <div 
            className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col mb-4 animate-in fade-in slide-in-from-bottom-4"
            style={{
              boxShadow: '0 25px 50px rgba(79, 70, 229, 0.25)',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold text-lg">Sahayak AI</h3>
                  <p className="text-sm text-indigo-100">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl hover:bg-white/20 p-1 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50 to-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-xl rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                      <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <button
                  onClick={handleClearChat}
                  className="text-lg hover:bg-gray-200 p-2 rounded-lg transition"
                  title="Clear chat"
                >
                  🗑️
                </button>
                <form onSubmit={handleSendMessage} className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={loading}
                    className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-xl hover:shadow-lg transition disabled:opacity-50"
                  >
                    ➤
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center text-2xl"
          style={{
            boxShadow: '0 10px 30px rgba(79, 70, 229, 0.4)'
          }}
          title={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? '✕' : '💬'}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Custom styles for ReactMarkdown */
        .prose ul { list-style-type: disc; padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
        .prose ol { list-style-type: decimal; padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
        .prose p { margin-top: 0.5rem; margin-bottom: 0.5rem; }
        .prose p:first-child { margin-top: 0; }
        .prose p:last-child { margin-bottom: 0; }
        .prose strong { font-weight: 600; color: unset; }
      `}</style>
    </>
  );
}
