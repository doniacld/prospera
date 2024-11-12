import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // Import the plugin for markdown rendering
import remarkBreaks from 'remark-breaks'; // Import the plugin for new lines
import { MdSend } from 'react-icons/md';
import Logo from '../Assets/Logo.svg';
import backgroundImg from '../Assets/women5.png';
import botAvatar from '../Assets/bot.png'; 
import { Link } from 'react-router-dom';  
import backIcon from '../Assets/undo.png'; 

const ChatBoostConfidence = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws/tips?userID=e751935c-f3e1-436f-a191-3796491fe225');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const botMessage = event.data;

      // Add the bot's formatted response to the chat
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: 'bot' }
      ]);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send user message via WebSocket
      ws.send(JSON.stringify({ message }));

      // Add user message to the chat
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      setMessage('');
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
              {msg.sender === 'bot' ? (
                  <>
                    <div className="profile-pic" style={{ backgroundImage: `url(${botAvatar})` }}></div>
                    {/* Render formatted bot message using ReactMarkdown and remarkBreaks */}
                    <ReactMarkdown className="message-text" remarkPlugins={[remarkBreaks]}>
                      {msg.text}
                    </ReactMarkdown>
                  </>
              ) : (
                  <div className="message-text">{msg.text}</div>
              )}
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
            <span></span> <MdSend className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoostConfidence;
