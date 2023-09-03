const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(require('morgan')('dev'));

// Routes
app.use('/api/auth', authRoutes);
// ...

// Start the server
require('./src/db/').dbServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
