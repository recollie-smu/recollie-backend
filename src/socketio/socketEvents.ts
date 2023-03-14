function handleDisconnect() {
    console.log('client disconnected');
}

function sensorBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('sensor', msg);
}

function taskBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('task', msg);
}

export { handleDisconnect, sensorBroadcast, taskBroadcast };