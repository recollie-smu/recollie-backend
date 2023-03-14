const socketio = require('socket.io');
const socketEvents = require('./socketEvents.ts');

module.exports = (http, supabaseChannel) => {
  const io = socketio(http);

  const webUINamespace = io.of('/web-ui');
  const serialLooperNamespace = io.of('/serial-looper');

  // Web UI namespace
  webUINamespace.on('connection', (socket) => {
    console.log('Web UI client connected');
    socket.send('You are connected to the Web UI namespace');
    socket.on('disconnect', () => socketEvents.handleDisconnect());
    socket.on('task', (msg) => socketEvents.taskBroadcast(serialLooperNamespace, msg));
  });
  
  // Serial looper namespace
  serialLooperNamespace.on('connection', (socket) => {
    console.log('Serial looper client connected');
    socket.send('You are connected to the Serial Looper namespace');
    socket.on('disconnect', () => socketEvents.handleDisconnect());
    socket.on('task', (msg) => socketEvents.taskBroadcast(webUINamespace, msg));
    socket.on('sensor', (msg) => socketEvents.sensorBroadcast(webUINamespace, msg));
  });

  // Subscribe Web UI namespace to Supabase channel for updates on the reminders table
  supabaseChannel.on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'reminders',
        },
        (payload: any) => webUINamespace.emit('reminder', payload)
    ).subscribe();

  
};