const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
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
    required: true,
  },
}, {collection: 'budgets'});

module.exports = mongoose.model('budgetSchema', budgetSchema);

