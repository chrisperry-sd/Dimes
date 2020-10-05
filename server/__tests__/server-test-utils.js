import {db} from '../budgetSchema';
import * as generate from './generate';

async function initDb({
  transactions = Array.from({length: 5}, () => generate.transactionData()),
} = {}) {
  db.transactions = transactions;
  return {transactions};
}
