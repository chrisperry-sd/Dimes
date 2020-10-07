/* eslint no-console: 0 */

const Transaction = require('../models/transactions');

exports.getAllTransactions = async function (req, res) {
  try {
    const transaction = await Transaction.find();
    res.status(200);
    res.send(transaction);
  } catch (error) {
    console.log('get all budgets error: ', error);
    res.status(500);
  }
};
exports.addTransaction = async function (req, res) {
  try {
    const { amount, merchant, category } = req.body;
    const newTransaction = await Transaction.create({
      amount,
      merchant,
      category,
    });
    res.status(201);
    res.send(newTransaction);
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};
exports.deleteTransaction = async function (req, res) {
  try {
    const { _id } = req.params;
    await Transaction.findByIdAndDelete({ _id });
    res.sendStatus(204);
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};
