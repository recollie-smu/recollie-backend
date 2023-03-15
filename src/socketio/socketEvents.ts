function handleDisconnect(namespace) {
    console.log(`${namespace} client disconnected`);
}

function sensorBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('sensor', msg);
}

function taskBroadcast(socket, msg) {
    //Broadcast to all clients except the sender
    socket.emit('task', msg);
}

async function reminderUpdateBroadcast(socket, payload : JSON) {
    //Broadcast to all clients except the sender
    socket.timeout(10000).emit("reminder", payload, (err, responses) => {
        if (err) {
            // some clients did not acknowledge the event in the given delay
            console.log("reminder update have timed out");
        } 
      });
}

export { handleDisconnect, sensorBroadcast, taskBroadcast, reminderUpdateBroadcast};