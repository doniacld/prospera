import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import johnDoeImage from '../Assets/john-doe-image.png';
import Logo from '../Assets/Logo.svg';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null); // Reference to the chat container
  const navigate = useNavigate(); // Hook to navigate between routes

  // Scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Effect to auto-scroll every time a new message is added
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Function to handle message sending
  const handleSendMessage = () => {
    if (message.trim()) {
      // Add the user's message
      const newMessages = [...chatMessages, { sender: 'user', message }];
      setChatMessages(newMessages);
      setMessage(''); // Clear input field
      setShowSuggestions(false);

      // Simulate bot's response (or you can replace this with backend logic)
      setTimeout(() => {
        const botResponse = { sender: 'bot', message: `You said: ${message}` }; // Replace with dynamic bot message
        setChatMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000); // Simulate a delay in the bot's response
    }
  };

  // Handle suggestion click (navigate to other chats)
  const handleSuggestionClick = (chatType) => {
    navigate(`/chatbot/${chatType}`);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-left">
        <div className="chat-history-title">Chat History</div>
        <div className="chat-history">
          <div className="date-divider">Today</div>
          <div className="chat-message">
            Hello!
            <span className="timestamp">10:15 AM</span>
          </div>
          <div className="chat-message">
            Salary Prediction
            <span className="timestamp">10:16 AM</span>
          </div>
        </div>
      </div>

      <div className="chatbot-right">
        <div className="chatbot-header">
          <div className="prospera-text">
            <img src={Logo} alt="Prospera Logo" className="prospera-logo" />
          </div>
          <div className="profile-section">
            <div className="profile-circle">
              <img src={johnDoeImage} alt="User Profile" className="profile-image" />
            </div>
            <FontAwesomeIcon icon={faPlus} size="lg" className="add-chat-icon" />
          </div>
        </div>

        {showSuggestions && (
          <div className="suggestions-section">
            <div className="suggestion-options">
              <div
                className="suggestion-box"
                onClick={() => handleSuggestionClick('salary')}
              >
                <span>💰</span>
                <span>Salary Benchmark</span>
              </div>
              <div
                className="suggestion-box"
                onClick={() => handleSuggestionClick('negotiation')}
              >
                <span>📈</span>
                <span>Negotiation Training</span>
              </div>
              <div
                className="suggestion-box"
                onClick={() => handleSuggestionClick('confidence')}
              >
                <span>🌟</span>
                <span>Boost Your Confidence</span>
              </div>
            </div>
          </div>
        )}

        <div className="chat-messages" ref={chatContainerRef}>
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}-message`}>
              {msg.message}
            </div>
          ))}
        </div>

        <div className="input-section">
          <div className="input-with-icon">
            <AiOutlinePaperClip className="attach-icon" />
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <MdSend className="send-icon" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
