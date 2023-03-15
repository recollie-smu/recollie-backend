const socketio = require('socket.io');
const socketEvents = require('./socketEvents.ts');

/**
 * Creates a socket.io instance.
 * 
 * @remarks
 * Creates 2 namespaces: 
 * - Web UI namespace for the base station UI
 * - Serial looper namespace for the serial looper
 * Supabase channel is also subscribed to for updates on the reminders table.
 * 
 * @param http - The http server instance.
 * @param supabaseChannel - The Supabase channel instance.
 * @returns The socket.io instance.
 */

module.exports = (http, supabaseChannel) => {
  const io = socketio(http);

  const webUINamespace = io.of('/web-ui');
  const serialLooperNamespace = io.of('/serial-looper');

  // Web UI namespace
  webUINamespace.on('connection', (socket) => {
    console.log('Web UI client connected');
    socket.send('You are connected to the Web UI namespace');
    socket.on('disconnect', () => socketEvents.handleDisconnect('Web UI'));
    socket.on('task', (msg) => socketEvents.taskBroadcast(serialLooperNamespace, msg));
  });
  
  // Serial looper namespace
  serialLooperNamespace.on('connection', (socket) => {
    console.log('Serial looper client connected');
    socket.send('You are connected to the Serial Looper namespace');
    socket.on('disconnect', () => socketEvents.handleDisconnect("Serial looper"));
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
        (payload: JSON) => socketEvents.reminderUpdateBroadcast(webUINamespace, payload)
    ).subscribe();

  
};