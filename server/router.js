const router = require('express').Router();
const controller = require('./controller');

router.get('/budgets', controller.getAllBudgets);
router.post('/budgets', controller.createBudget);
router.put('/budgets/:_id', controller.editBudget);
router.delete('/budgets/:_id', controller.deleteBudget);

router.get('/transactions', controller.getAllTransactions);
router.post('/transactions', controller.addTransaction);
router.delete('/transactions/:_id', controller.deleteTransaction);

module.exports = router;
