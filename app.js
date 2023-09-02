const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes');


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(require('morgan')('dev'));

// Routes
app.use('/api/auth', authRoutes);
// ...

require('./src/db/').server();
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
