const router = require('express').Router();
const budgets = require('./controller');

router.get('/budgets', budgets.getAllBudgets);
router.post('/budgets', budgets.createBudget);

router.get('/transactions', budgets.getAllTransactions);
router.post('/transactions', budgets.createTransaction);

module.exports = router;
