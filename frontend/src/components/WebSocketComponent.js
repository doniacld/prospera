import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    let socket;

    useEffect(() => {
        // Initialize WebSocket connection
        socket = new WebSocket('ws://localhost:8080/ws/salary?jobTitle=swe&experience=3&location=nice');

        socket.onopen = () => {
            console.log('WebSocket connected');
            // Envoi d'un premier message (facultatif)
            socket.send('Bonjour, je cherche des informations sur les salaires.');
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
        //
        // setWs(websocket);
        //
        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        // Cleanup WebSocket on component unmount
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (socket && input) {
            console.log("Sending message:", input);
            socket.send(input);
            // setInput('');
        }
    };

    return (
        <div>
            <h1>Chat WebSocket</h1>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default WebSocketComponent;
