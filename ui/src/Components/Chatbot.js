import React, { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdShare, MdSend } from "react-icons/md";
import Logo from "../Assets/Logo.svg";
//import "./Chatbot.css";

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
          {/* Placeholder chat messages */}
          <div className="chat-message">Hello!</div>
          <div className="chat-message">How can I help you today?</div>
        </div>
      </div>

      <div className="chatbot-right">
        <div className="chatbot-header">
          <div className="prospera-text">Prospera</div>
          <div className="profile-section">
            <span className="profile-name">User Name</span>
            <MdShare size={24} />
          </div>
        </div>
        
        {showSuggestions && (
          <div className="suggestions-section">
            <img src={Logo} alt="Prospera Logo" className="prospera-logo" />
            <div className="suggestions-section">
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
