const mocks = {};

mocks.child = [{ name: 'James' }];
mocks.totalSpent = -52.0;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

mocks.transactions = [
  {
    _id: 1,
    date: today,
    amount: -38,
    merchant: 'Hollister',
    category: 'Shopping',
  },
  {
    _id: 2,
    date: today,
    amount: -9,
    merchant: 'Starbucks',
    category: 'Lunch',
  },
  {
    _id: 3,
    date: today,
    amount: -5,
    merchant: 'McDonalds',
    category: 'Lunch',
  },
];

mocks.budgets = [
  {
    _id: 1,
    date: today,
    expiry: tomorrow,
    budget: 20,
    category: 'Lunch',
  },
  {
    _id: 2,
    date: today,
    expiry: tomorrow,
    budget: 35,
    category: 'Shopping',
  },
];

export default mocks;
