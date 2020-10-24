import React from 'react';
import ChildViewAllowance from '../components/ChildViewAllowance';
import { render } from '@testing-library/react-native';
import mocks from '../__mocks__/mocks';

test('', () => {
  const { getByTestId, getByText } = render(
    <ChildViewAllowance data={mocks.transactions} />,
  );

  const allowance = getByText('until your next allowance');

  expect(allowance).toHaveTextContent('until your next allowance');
  console.log(allowance);
});
