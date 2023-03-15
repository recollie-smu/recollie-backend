const app = require('express')();
const server = require('http').createServer(app);
const createSocket = require('./src/socketio/socketio');
const { createClient } = require('@supabase/supabase-js')
const port = process.env.PORT || 8080;
require('dotenv').config();

/*
 * Entry point for the socketIO Server.
 * It sets up the supabase client, routes, and socket.io instance.
 *   
 * @remarks
 * The supabase client is used to connect to the reminder table.
 * The socket.io instance is used to handle socket communication between the base station UI and the serial looper.
 *
 * @packageDocumentation
 * @module app
 * @preferred
 */ 


// Set up supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const supabaseChannel = supabase.channel('table-db-changes');

// Set up routes
app.get('/', function(req, res) {
  res.json({'message': 'ok'});
});

const routes = require('./src/routes/apiRoutes.ts')(supabase);
app.use('/api', routes);

// Create socket.io instance
createSocket(server, supabaseChannel)

// Start server
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
