const Budgets = require('./budgetSchema');

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
    const {category, budget} = req.body;
    const newBudget = await Budgets.create({category, budget});
    res.status(200);
    res.send(newBudget);
  } catch (error) {
    console.log('create budget error: ', error);
    res.status(500);
  }
};
