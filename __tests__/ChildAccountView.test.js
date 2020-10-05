import React from 'react';
import { render } from '@testing-library/react-native';
import { toHaveTextContent } from '@testing-library/jest-native';
expect.extend({ toHaveTextContent });

import ChildAccountView from '../screens/ChildAccountView';
import { getTransactions } from '../ApiService';

jest.mock('../ApiService');

const fakeTransactions = [
  {
    _id: 1,
    Date: new Date(),
    amount: -38,
    merchant: 'Hollister',
    category: 'Shopping',
  },
  {
    _id: 2,
    Date: new Date(),
    amount: -9,
    merchant: 'Starbucks',
    category: 'Lunch',
  },
  {
    _id: 3,
    Date: new Date(),
    amount: -5,
    merchant: 'McDonalds',
    category: 'Lunch',
  },
];

getTransactions.mockResolvedValue(fakeTransactions);

describe("the child's account view", () => {
  it('loads the transactions', () => {
    const { getByTestId } = render(
      <ChildAccountView
        transactions={fakeTransactions}
        thisWeeksTransactions={fakeTransactions}
        child={[{ name: 'James' }]}
        totalSpent={10}
        budget={[]}
      />,
    );

    const transactions = getByTestId('transactions');

    expect(transactions).toHaveTextContent(
      "Look what's happened in your account this week:",
    );
  });
});
