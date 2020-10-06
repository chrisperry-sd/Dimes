const router = require('express').Router();
const budgets = require('./controllers/budgets');
const transactions = require('./controllers/transactions');
const users = require('./controllers/users');
const kids = require('./controllers/kids');

// BUDGETS
router.get('/budgets', budgets.getAllBudgets);
router.post('/budgets', budgets.createBudget);
router.put('/budgets/:_id', budgets.editBudget);
router.delete('/budgets/:_id', budgets.deleteBudget);

// TRANSACTIONS
router.get('/transactions', controller.getAllTransactions);
router.post('/transactions', controller.addTransaction);
router.delete('/transactions/:_id', controller.deleteTransaction);

// USERS
router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/dashboard', users.loadUserDetails);
// router.put('/:_id/:field', users.editUserDetails);

// KIDS
router.get('/kids', kids.getAllKids);
router.post('/kids', kids.createKid);
router.put('/kids/:_id', budgets.editKid);
router.delete('/kids/:_id', budgets.deleteKid);

module.exports = router;
