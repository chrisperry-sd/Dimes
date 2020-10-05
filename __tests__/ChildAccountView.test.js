import React from 'react';
import { render } from '@testing-library/react-native';
import { toHaveTextContent } from '@testing-library/jest-native';
expect.extend({ toHaveTextContent });

import ChildAccountView from '../screens/ChildAccountView';
import mocks from '../mocks/mocks';

describe("the child's account view", () => {
  it('loads the transactions', () => {
    const { getByTestId } = render(
      <ChildAccountView
        transactions={mocks.transactions}
        thisWeeksTransactions={mocks.transactions}
        child={mocks.child}
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
      <ChildAccountView
        transactions={[]}
        thisWeeksTransactions={[]}
        budget={[]}
        child={mocks.child}
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
