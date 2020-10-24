import React from 'react';
import { render } from '@testing-library/react-native';
import { toHaveTextContent } from '@testing-library/jest-native';
expect.extend({ toHaveTextContent });

import ChildDashboard from '../screens/ChildDashboard';
import mocks from '../__mocks__/mocks';

describe("the child's account view", () => {
  it('loads the transactions', () => {
    const { getByTestId } = render(
      <ChildDashboard
        transactions={mocks.transactions}
        thisWeeksTransactions={mocks.transactions}
        kids={mocks.kids}
        totalSpent={mocks.totalSpent}
        budget={mocks.budgets}
      />,
    );

    const transactions = getByTestId('transactions');
    const budgets = getByTestId('budgets');

    expect(transactions).toHaveTextContent(
      "Look what's happened in your account this week:",
    );
    expect(budgets).toHaveTextContent('Budgets');
  });

  it('shows message when there are no transactions to display', () => {
    const { getByTestId } = render(
      <ChildDashboard
        transactions={[]}
        thisWeeksTransactions={[]}
        budget={[]}
        kids={mocks.kids}
        totalSpent={0}
      />,
    );

    const transactions = getByTestId('transactions');
    const budgets = getByTestId('budgets');

    expect(transactions).toHaveTextContent(
      "You've spent nothing so far this week!",
    );
    expect(budgets).not.toHaveTextContent('Budgets');
  });
});
