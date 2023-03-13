const socketio = require('socket.io');
const socketEvents = require('./socketEvents.ts');

module.exports = (http) => {
    const io = socketio(http);

    io.on('connection', (socket) => {
        socket.send('connected');
        console.log('client connected');
        socket.on('disconnect', () => socketEvents.handleDisconnect());
        socket.on('reminder', (msg) => socketEvents.reminderBroadcast(socket, msg))
        socket.on('task', (msg) => socketEvents.taskBroadcast(socket, msg));
    });
}
