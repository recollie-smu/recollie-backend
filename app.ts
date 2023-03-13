const app = require('express')();
const server = require('http').createServer(app);
const routes = require('./src/routes/apiRoutes.ts');
const createSocket = require('./src/socketio/socketio');
const { createClient } = require('@supabase/supabase-js')
const createSupabase = require('./src/supabase/supabase.ts');
const port = process.env.PORT || 8080;

// Set up routes
app.get('/', function(req, res) {
  res.json({'message': 'ok'});
});
app.use('/api', routes);

// Create socket.io instance
createSocket(server)

// Set up supabase client
require('dotenv').config();
const channel = createSupabase(createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY))

// Start server
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

