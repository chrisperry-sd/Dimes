const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/kidsBudgeting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    expiry: {
      type: Date,
      required: true,
    },
    display: {
      type: Boolean,
      default: true,
    },
    alerted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'budgets' },
);

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    merchant: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { collection: 'transactions' },
);

const Budget = mongoose.model('budgetSchema', budgetSchema);
const Transaction = mongoose.model('transactionSchema', transactionSchema);

module.exports = { Transaction, Budget };
