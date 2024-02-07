const socket = io();

function loginBlock() {
    const loginInput = document.getElementById("login");
    const login = loginInput.value.trim();

    if (login !== "") {
        const form = document.getElementById("form");
        const chat = document.getElementById("chat");
        const user = document.getElementById("user-name");
        form.style.opacity = 0;
        form.style.display = "none";
        chat.style.display = "flex";
        chat.style.opacity = 1;
        chat.style.justifyContent = "flex-end";
        chat.style.alignItems = "flex-start";
        user.style.opacity = 1;

        const memberDiv = document.getElementById("user");
        const memberDivname = document.getElementById("user-name");
        memberDiv.innerHTML = login;
        memberDivname.innerHTML = login;

        socket.emit('login', login); // Отправляем серверу информацию о входе
    }
}

socket.emit('login', login); // Отправляем серверу информацию о входе
    


document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию
    loginBlock();
});

document.getElementById("msg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const msgInput = document.getElementById("msg");
    const msg = msgInput.value.trim();
    if (msg !== "") {
        socket.emit('chat message', msg); // Отправляем сообщение на сервер
        msgInput.value = ''; // Очищаем поле ввода сообщения
    }
});

// Обработчик получения сообщения от сервера
socket.on('chat message', (msg) => {
    const chatMessages = document.getElementById("chat-messages");
    const listItem = document.createElement("li");
    listItem.textContent = msg;
    chatMessages.appendChild(listItem);
});

// Дополнительные обработчики событий здесь...
