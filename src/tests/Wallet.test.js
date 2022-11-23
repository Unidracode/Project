import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Login', () => {
  test('testa login', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    expect(inputValue).toHaveTextContent('');
    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription).toHaveTextContent('');
    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();
    const inputMethod = screen.getByTestId('method-input');
    expect(inputMethod).toBeInTheDocument();
    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
  });
});
