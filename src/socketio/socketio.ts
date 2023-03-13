const socketio = require('socket.io');
const socketEvents = require('./socketEvents.ts');

module.exports = (http) => {
    socketio(http).on('connection', (socket) => {
        console.log('client connected');
        socket.send('You are connected');
        socket.on('disconnect', () => socketEvents.handleDisconnect());
        socket.on('reminder', (msg) => socketEvents.reminderBroadcast(socket, msg))
        socket.on('task', (msg) => socketEvents.taskBroadcast(socket, msg));
    });
}
