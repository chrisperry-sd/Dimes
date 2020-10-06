const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  allowanceFrequency: { type: String, required: true },
  allowanceDay: { type: Number, required: true },
  allowanceAmount: { type: Number, required: true },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
