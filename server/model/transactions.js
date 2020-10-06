const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  kidId: { type: String, required: true },
  parentId: { type: String, required: true },
  amount: { type: Number, required: true },
  budgetCategory: { type: String, required: true },
  merchant: { type: String, required: true },
  transactionDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
