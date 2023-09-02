const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: String,
  course: String,
  text: String
},
{timestamps: true}
);

module.exports = mongoose.model('User', userSchema);
