/* eslint no-console: 0 */

const Budget = require('../models/budgets');

exports.getAllBudgets = async function (req, res) {
  try {
    const budget = await Budget.find();
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
    const newBudget = await Budget.create({ category, budget, expiry });
    res.status(201);
    res.send(newBudget);
  } catch (error) {
    console.log('create budget error: ', error);
    res.status(500);
  }
};
exports.editBudget = async function (req, res) {
  try {
    const { _id } = req.params;
    const { category, budget, expiry } = req.body;
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id },
      {
        $set: {
          category,
          budget,
          expiry,
        },
      },
      { new: true },
    );
    res.send(updatedBudget);
    res.status(200);
  } catch (error) {
    console.log('---> Error editing database', error);
    res.status(500);
  }
};
exports.deleteBudget = async function (req, res) {
  try {
    const { _id } = req.params;
    await Budget.findByIdAndDelete({ _id });
    res.sendStatus(204);
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};
