import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import Logo from '../Assets/Logo.svg';
import backgroundImg from '../Assets/women5.png';
import botAvatar from '../Assets/bot.png'; 
import { Link } from 'react-router-dom';  
import backIcon from '../Assets/undo.png'; 

const ChatBoostConfidence = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to the chat
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      setMessage('');

      // Simulate bot response (Comment section for backend integration)
      setTimeout(() => {
        // BACKEND LOGIC:
        const botReply = `You sent: ${message}`;  // Simulated bot response

        // Add the bot's response to the chat
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { text: botReply, sender: 'bot' }
        ]);
      }, 1000); // Bot replies after 1 second
    }
  };

  return (
    <div className="chatbot-page">
      {/* Blurred background image */}
      <div className="background-blur" style={{ backgroundImage: `url(${backgroundImg})` }}></div>


      <div className="chat-container">
        <div className="chatbot-header">
        <h2 className="chat-title">Boosting your Confidence</h2>
        </div>

        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender}-message`}
            >
              {msg.sender === 'bot' && (
                <div className="profile-pic" style={{ backgroundImage: `url(${botAvatar})` }}></div>
              )}
              <div className="message-text">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Rechoose icon for navigating back */}
        <div className="rechoose-option-icon-container">
          <Link to="/chatSuggestions">
            <img src={backIcon} alt="Back" className="rechoose-icon" />
          </Link>
        </div>

        <div className="input-section">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <span>Send</span> <MdSend className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoostConfidence;
