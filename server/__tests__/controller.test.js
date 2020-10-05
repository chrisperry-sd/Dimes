import {getAllBudgets, getAllTransactions} from '../controller';
import {initDb} from 'server-test-utils';

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
  });
  return {req, res};
}

beforeEach(() => initDb());

test('getAllTransactions returns all the transactions in the database', async () => {
  const {req, res} = setup();

  await getAllTransactions(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  const firstCall = res.send.mock.calls[0];
  const firstArg = firstCall[0];
  const {transactions} = firstArg;
  expect(transactions.length).toBeGreaterThan(0);
});

// test('getAllBudgets returns all the budgets in the database', async () => {
//   const req = {};
//   const res = {
//     status: jest.fn(),
//     send: jest.fn(),
//   };
//   await getAllBudgets(req, res);
//   expect(res.send).toHaveBeenCalledTimes(1);
// });
