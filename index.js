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
    console.log('Someone joined the chat!');
    io.emit('alert', 'Someone joined the chat!');

    socket.on('message', msg => socket.emit('message', msg));

    socket.on('disconnect', () => io.emit('alert', 'Someone left the chat.'));
});

server.listen(5000, () => console.log('Server listening on 5000'));
