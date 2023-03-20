const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const createSocket = require('./src/socketio/socketio');
const { createClient } = require('@supabase/supabase-js')
const port = process.env.PORT || 8080;

// import { TelegramCreds } from './src/models/reminder';
import { getStatusPayload } from './src/socketio/socketEvents';

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

// const teleCreds: TelegramCreds = {
//   teleUrl: 'https://api.telegram.org/bot',
//   token: process.env.TELEGRAM_TOKEN,
//   chatId: process.env.TELEGRAM_CHAT_ID
// }

// Create socket.io instance
const webUINamespace = createSocket(server, supabaseChannel)

// Configurations
app.use(bodyParser.json());
app.use(cors());

// Set up routes
app.get('/', function(req, res) {
  res.json({'message': 'ok'});
});

// Telegram webhook
app.post('/', function(req, res) {
  const chatId = req.body.message.chat.id;
  const sentMessage = req.body.message.text;

  // Send reminders list request to the base station UI
  if (sentMessage.match(/\/reminders/gi)) {
    webUINamespace.emit('reminder', getStatusPayload(chatId));
    console.log(`Incoming reminders request from ${chatId}`);
  } 
  res.status(200).send({});

});

const routes = require('./src/routes/apiRoutes.ts')(supabase);
app.use('/api', routes);


// Start server
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
