import React, { useState, useEffect } from 'react';

const WebSocketTest = () => {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Initialize WebSocket connection
       const websocket = new WebSocket('ws://localhost:8080/ws/salary?jobTitle=swe&experience=3&location=nice');

        websocket.onopen = () => {
            console.log("WebSocket connected");
            setMessages(prev => [...prev, "Connected to WebSocket"]);
        };

        websocket.onmessage = (event) => {
            console.log("Message from server:", event.data);
            setMessages(prev => [...prev, "Server: " + event.data]);
        };

        websocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        websocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setWs(websocket);

        // Cleanup WebSocket on component unmount
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []);

    const sendMessage = () => {
        const message = "Hello from the frontend!";
        console.log("Sending message:", message);
        ws.send(message);
    };

    return (
        <div>
            <h1>WebSocket Test</h1>
            <button onClick={sendMessage}>Send Message</button>
            <div>
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
        </div>
    );
};

export default WebSocketTest;
