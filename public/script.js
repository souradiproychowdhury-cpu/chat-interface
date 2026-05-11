const socket = io();

const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

function sendMessage() {
    const msg = messageInput.value.trim();

    if (msg !== '') {
        socket.emit('chat message', msg);
        messageInput.value = '';
    }
}

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

socket.on('chat message', (msg) => {
    const div = document.createElement('div');

    div.classList.add('message');
    div.textContent = msg;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
});