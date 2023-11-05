require('dotenv').config();
const http = require('http');
require('./config/dbConnect');
const app = require('./app/app');

const PORT = process.env.PORT || 2020;

// Server configuration
const server = http.createServer(app);

// Server
server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
