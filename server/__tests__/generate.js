const faker = require('faker');

function transactionData() {
  return Object.assign({
    date: Date.now(),
    amount: faker.finance.amount(),
    merchant: faker.company.companyName(),
    category: faker.commerce.department(),
  });
}

function budgetData() {}

module.exports = {
  transactionData,
  budgetData,
};
