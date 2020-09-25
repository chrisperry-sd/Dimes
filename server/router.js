const router = require('express').Router();
const budgets = require('./controller');

router.get('/budgets', budgets.getAllBudgets);
router.post('/budgets', budgets.createBudget);

module.exports = router;
