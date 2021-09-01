
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passward: {
    type: String,
    required: true
  },
  avatar: {
    type: String,

  },
  address: {
    type: String,
    required: true
  }, number: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now

  }
});

const User = mongoose.model('User', UserSchema, 'user');
module.exports = User;
