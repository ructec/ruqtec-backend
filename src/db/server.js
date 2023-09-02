const mongoose = require('mongoose');
require('dotenv').config()
const { MONGO_URI } = process.env;
module.exports = async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      
      mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
      });
      
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
};

