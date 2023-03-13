const socketio = require('socket.io');
const socketEvents = require('./socketEvents.ts');

module.exports = (http) => {
    const io = socketio(http);

    io.on('connection', (socket) => {
        console.log('client connected');
        socket.on('disconnect', function () {
        console.log('client disconnected');
        });
    })
}