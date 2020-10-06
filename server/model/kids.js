const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  parentId: { type: String, required: true },
  allowanceAmount: { type: Number, required: true },
  allowanceFrequency: { type: String, required: true },
  allowanceDay: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() },
});

const Kid = mongoose.model('kid', kidSchema);

module.exports = Kid;
