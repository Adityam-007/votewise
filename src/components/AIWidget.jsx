import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { askClaude } from '../services/claudeService';
import './AIWidget.css';

const AIWidget = ({ currentModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm VoteWise AI. Got questions about ${currentModule.title}? Ask away!` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await askClaude(userMessage, currentModule);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="ai-widget-wrapper">
      {!isOpen && (
        <button 
          className="ai-trigger btn btn-primary" 
          onClick={() => setIsOpen(true)}
        >
          <Sparkles size={20} />
          <span>Ask {currentModule.id ? `about ${currentModule.title}` : 'VoteWise AI'}</span>
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window glass animate-fade-in">
          <div className="ai-chat-header">
            <div className="header-info">
              <Sparkles size={18} className="sparkle-icon" />
              <div>
                <h3>VoteWise AI</h3>
                <p className="status">Online • {currentModule.title}</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-bubble loading">
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIWidget;
