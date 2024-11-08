import React, { useEffect, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdShare, MdSend, MdArrowBack } from "react-icons/md";
import Logo from "../Assets/Logo.svg";
import axios from "axios"; // Import axios for making HTTP requests

const Chatbot = () => {
  const [message, setMessage] = useState(""); // State for message input
  const [showSuggestions, setShowSuggestions] = useState(true); // State for suggestions visibility
  const [chatMessages, setChatMessages] = useState([]); // State for chat messages
  const [socket, setSocket] = useState(null); // WebSocket connection
  const [activeChat, setActiveChat] = useState(""); // Track the active chat type
  const [chatHistory, setChatHistory] = useState([]); // Store chat history

  // Function to handle WebSocket connection and store it in state
  const connectWebSocket = (endpoint) => {
    if (socket) {
      socket.close(); // Close any existing connection before opening a new one
    }

    const newSocket = new WebSocket(`ws://localhost:8080/${endpoint}`);

    newSocket.onopen = () => {
      console.log(`Connected to ${endpoint}`);
      setChatMessages([]); // Clear chat messages for a new conversation
      newSocket.send(`Starting a new session for ${activeChat}`);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    newSocket.onmessage = (event) => {
      setChatMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setSocket(newSocket);
    setShowSuggestions(false); // Hide suggestions after connection
  };

  // Function to handle when a new chat is started, updating chat history instantly
  const startNewChat = (chatName, endpoint) => {
    // Immediately add the new chat session to the history with a unique ID
    const newChatEntry = {
      id: Date.now().toString(), // Use timestamp as a simple unique ID (replace with backend ID in production)
      name: chatName,
      date: new Date().toLocaleString(),
    };
    setChatHistory((prevHistory) => [newChatEntry, ...prevHistory]); // Add to history instantly

    setActiveChat(chatName);
    connectWebSocket(endpoint);
  };

  // Function to send a message through WebSocket
  const handleSendMessage = () => {
    if (message.trim() && socket) {
      setChatMessages([...chatMessages, message]);
      socket.send(message);
      setMessage(""); // Clear the input
    }
  };

  // Go back to suggestions
  const handleGoBack = () => {
    if (socket) {
      socket.close();
    }
    setSocket(null);
    setShowSuggestions(true);
    setChatMessages([]);
    setActiveChat("");
  };

  // Button click handlers for each chat type
  const handleSalaryClick = () => startNewChat("Salary Benchmark", "ws/chatbot/salary");
  const handleNegotiationClick = () => startNewChat("Negotiation Training", "ws/chatbot/negotiation");
  const handleBoostClick = () => startNewChat("Boost Your Confidence", "ws/chatbot/boost");

  // New function to load previous chat history from the backend
  const loadChatHistory = async (chatId, chatName) => {
    try {
      const response = await axios.get(`http://localhost:8080/chat/history?${chatId}`);
      const { messages } = response.data;

      setChatMessages(messages); // Set the fetched messages as the chat messages
      setActiveChat(chatName);
      setShowSuggestions(false); // Hide suggestions when viewing history
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Handle click on a chat history item
  const handleChatHistoryClick = (chatId, chatName) => {
    loadChatHistory(chatId, chatName); // Fetch and display chat history
  };

  // Clean up WebSocket connection on component unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
      <div className="chatbot-container">
        <div className="chatbot-left">
          <div className="chat-history-title">Chat History</div>
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
                <div
                    key={index}
                    className="chat-history"
                    onClick={() => handleChatHistoryClick(chat.id, chat.name)} // Load chat history on click
                >
                  <div className="chat-message">{chat.name} {chat.date}</div>
                </div>
            ))}
          </div>
        </div>

        <div className="chat-messages">
          {/* Render the sent messages here */}
          {chatMessages.map((msg, index) => (
              <div key={index} className="chat-message user-message">
                {msg}
              </div>
          ))}
        </div>


        <div className="chatbot-right">
          <div className="chatbot-header">
            <div className="prospera-text">Prospera</div>
            <div className="profile-section">
              <span className="profile-name">User Name</span>
              <MdShare size={24}/>
            </div>
          </div>

          {!showSuggestions && (
              <div className="go-back" onClick={handleGoBack}>
                <MdArrowBack size={24}/> <span>Go Back</span>
              </div>
          )}

          {showSuggestions && (
              <div className="suggestions-section">
                <img src={Logo} alt="Prospera Logo" className="prospera-logo"/>
                <div className="suggestions-section">
                  <div className="suggestion-box" onClick={handleSalaryClick}>
                    <span>💰</span>
                    <span>Salary Benchmark</span>
                  </div>
                  <div className="suggestion-box" onClick={handleNegotiationClick}>
                    <span>📈</span>
                    <span>Negotiation Training</span>
                  </div>
                  <div className="suggestion-box" onClick={handleBoostClick}>
                    <span>🌟</span>
                    <span>Boost Your Confidence</span>
                  </div>
                </div>
              </div>
          )}

          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message user-message">
                  {msg}
                </div>
            ))}
          </div>

          <div className="input-section">
            <div className="input-with-icon">
              <AiOutlinePaperClip className="attach-icon"/>
              <input
                  type="text"
                  className="message-input"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <MdSend className="send-icon" onClick={handleSendMessage}/>
          </div>
        </div>
      </div>
  );
};

export default Chatbot;
