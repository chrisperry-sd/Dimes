const router = require('express').Router();
const budgets = require('./controller');

router.get('/budgets', budgets.getAllBudgets);
router.post('/budgets', budgets.createBudget);
router.delete('/budgets/:_id', budgets.deleteBudget);

router.get('/transactions', budgets.getAllTransactions);


module.exports = router;
