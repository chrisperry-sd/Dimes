const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  allowanceFrequency: { type: String, required: true },
  allowanceDay: { type: Number, required: true },
  allowanceAmount: { type: Number, required: true },
});

const Kid = mongoose.model('kid', kidSchema);

module.exports = Kid;
