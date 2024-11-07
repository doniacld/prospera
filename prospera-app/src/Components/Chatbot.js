import React, { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import johnDoeImage from "../Assets/john-doe-image.png"; // Ensure the path is correct
import Logo from "../Assets/Logo.svg"; 

const Chatbot = () => {
  const [message, setMessage] = useState(""); // State for message input
  const [showSuggestions, setShowSuggestions] = useState(true); // State for suggestions visibility
  const [chatMessages, setChatMessages] = useState([]); // State for sent messages

  const handleSendMessage = () => {
    if (message.trim()) { // Check if message is not empty
      setChatMessages([...chatMessages, message]); // Add message to chat messages
      setMessage(""); // Clear the input
      setShowSuggestions(false); // Hide suggestions
    }
  };

  return (
    <div className="chatbot-container">
     <div className="chatbot-left">
  <div className="chat-history-title">Chat History</div>
  <div className="chat-history">
    {/* Date divider */}
    <div className="date-divider">Today</div>
    
    {/* Chat messages with timestamps */}
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
          <div className="prospera-text"> <img src={Logo} alt="Prospera Logo" className="prospera-logo" /></div>
          <div className="profile-section">
            {/* Profile Circle with john-doe-image.png */}
            <div className="profile-circle">
              <img src={johnDoeImage} alt="User Profile" className="profile-image" />
            </div>
            {/* Plus icon to add new chat */}
            <FontAwesomeIcon icon={faPlus} size="lg" className="add-chat-icon" />
          </div>
        </div>
        
        {showSuggestions && (
  <div className="suggestions-section">
    <div className="suggestion-options">
      <div className="suggestion-box">
        <span>💰</span>
        <span>Salary Benchmark</span>
      </div>
      <div className="suggestion-box">
        <span>📈</span>
        <span>Negotiation Training</span>
      </div>
      <div className="suggestion-box">
        <span>🌟</span>
        <span>Boost Your Confidence</span>
      </div>
    </div>
  </div>
)}

        <div className="chat-messages">
          {/* Render the sent messages here */}
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
              value={message} // Bind input value to state
              onChange={(e) => setMessage(e.target.value)} // Update state on change
            />
          </div>
          <MdSend className="send-icon" onClick={handleSendMessage} /> {/* Send message on click */}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
