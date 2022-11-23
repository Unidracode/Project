import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import { currencies, mockExpense } from './helpers/mockData';

const valueInput = 'value-input';
const descriptionInput = 'description-input';
const currencyString = 'currency-input';
const methodInput = 'method-input';
const tagInput = 'tag-input';
const debitCard = 'Cartão de débito';

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
    renderWithRouterAndRedux(<WalletForm />, { initialState: INITIAL_STATE });
    const inputValue = screen.getByTestId(valueInput);
    expect(inputValue).toBeInTheDocument();
    expect(inputValue).toHaveTextContent('');
    const inputDescription = screen.getByTestId(descriptionInput);
    expect(inputDescription).toBeInTheDocument();
    expect(inputDescription).toHaveTextContent('');
    const inputCurrency = screen.getByTestId(currencyString);
    expect(inputCurrency).toBeInTheDocument();
    const inputMethod = screen.getByTestId(methodInput);
    expect(inputMethod).toBeInTheDocument();
    const inputTag = screen.getByTestId(tagInput);
    expect(inputTag).toBeInTheDocument();
    const addExpenseButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(addExpenseButton).toBeInTheDocument();

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'teste1');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    userEvent.selectOptions(inputTag, 'Lazer');
    userEvent.click(addExpenseButton);

    userEvent.selectOptions(currencyInput, 'BTC');
    expect(screen.getByText('BTC').selected).toBeTruthy();
    userEvent.selectOptions(inputMethod, debitCard);
    expect(screen.getByText(debitCard).selected).toBeTruthy();
    userEvent.selectOptions(inputTag, 'Trabalho');
    expect(screen.getByText('Trabalho').selected).toBeTruthy();
  });

  test('edit', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const inputValue = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const inputCurrency = screen.getByTestId(currencyString);
    const inputMethod = screen.getByTestId(methodInput);
    const inputTag = screen.getByTestId(tagInput);

    userEvent.type(inputValue, '1');
    userEvent.type(inputDescription, '1');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));
    userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0]);
    userEvent.type(inputValue, '2');
    userEvent.type(inputDescription, '2');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, debitCard);
    userEvent.selectOptions(inputTag, 'Trabalho');

    expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));

    expect(await screen.findByRole('cell', { name: '2.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '2' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: debitCard })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
  });

  test('testa inputs button add', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const inputCurrency = screen.getByTestId(currencyString);
    const inputMethod = screen.getByTestId(methodInput);
    const inputTag = screen.getByTestId(tagInput);

    userEvent.type(inputValue, '1');
    userEvent.type(inputDescription, '1');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputMethod, debitCard);
    userEvent.selectOptions(inputTag, 'Trabalho');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    expect(await screen.findByRole('cell', { name: '1.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '1' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: debitCard })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Real' })).toBeInTheDocument();
  });
});
