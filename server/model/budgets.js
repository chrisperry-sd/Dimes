const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  expiry: { type: Date, required: true },
  date: { type: Date, default: Date.now },
  alerted: { type: Boolean, default: false },
});

const Budget = mongoose.model('budget', budgetSchema);

module.exports = Budget;
