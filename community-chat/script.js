// Connect to WebSocket server
const socket = new WebSocket('ws://localhost:5000'); // Ganti URL jika hosting backend

// DOM Elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Send message to server
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.send(JSON.stringify({ message }));
        appendMessage('You: ' + message, 'sent');
        messageInput.value = '';
    }
});

// Receive messages from server
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    appendMessage(data.sender + ': ' + data.message, 'received');
});

// Append message to chat box
function appendMessage(text, type) {
    const messageElement = document.createElement('p');
    messageElement.textContent = text;
    messageElement.className = type;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}