const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

  date: {
    type: Date,
    default: new Date(Date.now()),
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
  }
}, {collection: 'transactions'})

module.exports = mongoose.model('transactionSchema', transactionSchema);