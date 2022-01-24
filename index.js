import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.emit('alert', 'welcome to the chat');
    socket.broadcast.emit('alert', 'Someone joined the chat!');

    socket.on('message', msg => io.emit('message', msg));

    socket.on('disconnect', () => socket.broadcast.emit('alert', 'Someone left the chat.'));
});

server.listen(process.env.PORT || 5000, () =>
    console.log(`Server listening on ${process.env.PORT || 5000}`)
);
