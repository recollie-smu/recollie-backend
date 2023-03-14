const app = require('express')();
const server = require('http').createServer(app);
const routes = require('./src/routes/apiRoutes.ts');
const createSocket = require('./src/socketio/socketio');
const { createClient } = require('@supabase/supabase-js')
const port = process.env.PORT || 8080;
require('dotenv').config();

// Set up routes
app.get('/', function(req, res) {
  res.json({'message': 'ok'});
});
app.use('/api', routes);

// Set up supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const supabaseChannel = supabase.channel('table-db-changes');

// Create socket.io instance
createSocket(server, supabaseChannel)

// Start server
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
