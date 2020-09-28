const BASE_URL = 'http://localhost:3001';
// const BASE_URL = 'http://10.153.107.221:3001';

function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => {
      console.error(
        `Error fetching [${options ? options.method : 'GET'}]${path}`,
      );
      console.log('err', err);
    });
}

async function getBudgets() {
  return await fetchRequest('/budgets');
}
async function getTransactions() {
  return await fetchRequest('/transactions');
}

function postBudget(body) {
  return fetchRequest('/budgets', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
// function postTransaction(body) {
//   return fetchRequest('/transactions', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
// }

module.exports = {
  getBudgets,
  postBudget,
  getTransactions,
};
