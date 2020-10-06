const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  kidId: { type: String, required: true },
  parentId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  alerted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Budget = mongoose.model('budget', budgetSchema);

module.exports = Budget;
