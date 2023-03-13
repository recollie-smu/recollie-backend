function handleDisconnect() {
    console.log('client disconnected');
}

function reminderBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.broadcast.emit('reminder', msg);
}

function taskBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.broadcast.emit('task', msg);
}

export { handleDisconnect, reminderBroadcast, taskBroadcast };