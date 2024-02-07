const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Настройка статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Добавьте обработчик маршрута для загрузки вашего HTML-файла
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/index.html'));
});

// Обработчик подключения к сокету
io.on('connection', (socket) => {
    console.log('Новое подключение');

    // Обработчик события отправки сообщения
    socket.on('chat message', (msg) => {
        console.log('Сообщение: ' + msg);
        io.emit('chat message', msg); // Рассылаем сообщение всем клиентам
    });

    // Дополнительные обработчики событий здесь...
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Обработчик входа пользователя
  socket.on('login', (username) => {
      console.log('user logged in: ', username);
      socket.username = username; // Сохраняем имя пользователя в объекте сокета
  });

  // Обработчик получения сообщения от клиента
  socket.on('chat message', (msgData) => {
      console.log('message: ' + msgData.message);
  });

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

