const app = require('express')();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;
const route = require('./src/routes/apiRoutes.ts');

// Set up routes
app.get('/', function(req, res) {
  res.json({'message': 'ok'});
});
app.use('/api', route);

// Create socket.io instance
require('./src/socketio/socketio')(server)

// Start server
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

