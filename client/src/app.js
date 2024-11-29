import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        socket.emit('send_message', { message });
        setMessage('');
    };

    socket.on('receive_message', (data) => {
        setMessages((prev) => [...prev, data.message]);
    });

    return (
        <div>
            <h1>Community Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;