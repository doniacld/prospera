import React, { useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import johnDoeImage from '../Assets/john-doe-image.png'; // Use the same image or a different one
import Logo from '../Assets/Logo.svg'; // Same logo

const ChatSalary = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-left">
        <div className="chat-history-title">Chat History</div>
        <div className="chat-history">
          <div className="date-divider">Today</div>
          <div className="chat-message">
            Hello, let's talk about salary!
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
          </div>
        </div>

        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className="chat-message user-message">
              {msg}
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

export default ChatSalary;
