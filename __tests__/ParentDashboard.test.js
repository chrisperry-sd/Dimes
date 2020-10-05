import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ParentDashboard from '../screens/ParentDashboard';
import { expect, it } from '@jest/globals';

it('renders correctly', () => {
  const { getByText } = render(<ParentDashboard />);
});
