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
    const {category, budget, expiry} = req.body;
    const newBudget = await Budgets.create({category, budget, expiry});
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
exports.createTransaction = async function (req, res) {
  try {
    const {category, amount, date, merchant} = req.body;
    const newTransaction = await Transactions.create({category, amount, date, merchant});
    res.status(200);
    res.send(newTransaction);
  } catch (error) {
    console.log('create budget error: ', error);
    res.status(500);
  }
};

