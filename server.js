const express = require('express');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 2020;

// Server configuration
// Middleware configuration
app.use(morgan('dev'));

// Server
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
