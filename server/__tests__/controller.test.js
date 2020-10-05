const {
  getAllBudgets,
  getAllTransactions,
  createBudget,
  addTransaction,
  deleteBudget,
  deleteTransaction,
} = require('../controller');

const testTransaction = {
  amount: -10,
  merchant: 'Wagamama',
  category: 'Food',
};

const testBudget = {
  category: 'Food',
  budget: 20,
  expiry: Date.now(),
};

function setup() {
  const req = {
    params: {},
    body: {},
  };
  const res = {};
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this;
      }.bind(res),
    ),
    send: jest.fn(
      function send() {
        return this;
      }.bind(res),
    ),
    sendStatus: jest.fn(
      function sendStatus() {
        return this;
      }.bind(res),
    ),
  });
  return { req, res };
}

test('getAllTransactions returns all the transactions in the database', async () => {
  const { req, res } = setup();

  await getAllTransactions(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
});

test('getAllBudgets returns all the budgets in the database', async () => {
  const { req, res } = setup();

  await getAllBudgets(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
});

test('createBudget adds a new budget to the database and then deleteBudget deletes the budget with that id', async () => {
  const { req, res } = setup();

  req.body = testBudget;

  await createBudget(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(201);

  const firstCall = res.send.mock.calls[0];
  const firstArg = firstCall[0];
  const id = firstArg._id;

  req.params = {
    _id: id,
  };

  await deleteBudget(req, res);

  expect(res.sendStatus).toHaveBeenCalledTimes(1);
  expect(res.sendStatus).toHaveBeenCalledWith(204);
});

test('addTransaction adds a new transaction to the database and then deleteTransaction deletes the transaction with that id', async () => {
  const { req, res } = setup();

  req.body = testTransaction;

  await addTransaction(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(201);

  const firstCall = res.send.mock.calls[0];
  const firstArg = firstCall[0];
  const id = firstArg._id;

  req.params = {
    _id: id,
  };

  await deleteTransaction(req, res);

  expect(res.sendStatus).toHaveBeenCalledTimes(1);
  expect(res.sendStatus).toHaveBeenCalledWith(204);
});
