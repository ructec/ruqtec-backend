const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(require('morgan')('dev'));
// Configure CORS
const allowedOrigins = process.env.allowedOrigins; // Add your allowed origins here
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow if origin is in the allowed list or if it's not provided (e.g., a same-origin request)
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request if the origin is not allowed
    }
  },
};

app.use(cors(corsOptions));
// Routes
app.get('/', (req, res) =>{
    res.status(200).send('<h1> Hello World API</h1>');
})
app.use('/api/auth', authRoutes);

app.use('*', (req, res) =>{
    res.status(404).send('<h1>Invalid API end point</h1>');
})
// Start the server
require('./src/db/').dbServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
