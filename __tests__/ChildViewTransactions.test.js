import React from 'react';
import ChildViewTransactions from '../components/ChildViewTransactions';
import { render } from '@testing-library/react-native';
import mocks from '../__mocks__/mocks';

test('', () => {
  const { getByTestId } = render(
    <ChildViewTransactions data={mocks.transactions} />,
  );

  const transactions = getByTestId('weeklyTransactions');

  // expect(transactions).toHaveLength(mocks.transactions.length);
  // expect(transactions).toHaveTextContent('Hollister');
});
