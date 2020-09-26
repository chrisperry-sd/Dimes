// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://10.153.107.16:3001'; //we work

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

function getBudgets() {
  return fetchRequest('/budgets');
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

module.exports = {
  getBudgets,
  postBudget,
};
