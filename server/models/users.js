const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isKid: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
