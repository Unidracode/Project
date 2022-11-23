import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';
import { currencies, mockExpense } from './helpers/mockData';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies,
    expenses: mockExpense,
    editor: false,
    idToEdit: 0,
  },
};

describe('WalletForm', () => {
  test('testa WalletForm', () => {
    renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });
    const deleteButton = screen.getAllByTestId('delete-btn');
    expect(deleteButton).toHaveLength(2);
    const editButton = screen.getAllByTestId('edit-btn');
    expect(editButton).toHaveLength(2);
    userEvent.click(deleteButton[0]);
    expect(screen.getAllByTestId('delete-btn')).toHaveLength(1);
    expect(screen.getAllByTestId('edit-btn')).toHaveLength(1);
    userEvent.click(screen.getByTestId('edit-btn'));
  });
});
