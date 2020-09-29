const Budgets = require('./budgetSchema');
const Transactions = require('./transactionSchema');

exports.getAllBudgets = async function (req, res) {
  try {
    const budget = await Budgets.find();
    res.status(200);
    res.send(budget);
  } catch (error) {
    console.log('get all budgets error: ', error);
    res.status(500);
  }
};
exports.createBudget = async function (req, res) {
  try {
    const { category, budget, expiry } = req.body;
    const newBudget = await Budgets.create({ category, budget, expiry });
    res.status(200);
    res.send(newBudget);
  } catch (error) {
    console.log('create budget error: ', error);
    res.status(500);
  }
};
exports.getAllTransactions = async function (req, res) {
  try {
    const transaction = await Transactions.find();
    res.status(200);
    res.send(transaction);
  } catch (error) {
    console.log('get all budgets error: ', error);
    res.status(500);
  }
};
exports.deleteBudget = async function (req, res) {
  try {
    const { _id } = req.params;
    await Budgets.findByIdAndDelete({ _id })
    res.sendStatus(204);
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};
exports.addTransaction = async function (req, res) {
  try {
    const { amount, merchant, category } = req.body;
    const newTransaction = Transactions.create({ amount, merchant, category });
    res.status(200);
    res.send(newTransaction)
  } catch (error) {
    console.log('error: ', error);
    res.status(500)
  }
};