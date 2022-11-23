import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

export const VALID_EMAIL = 'alguem@email.com';
export const VALID_PASSWORD = '123456';
export const INVALID_EMAIL_0 = 'email';
export const INVALID_EMAIL_1 = 'email@com@';
export const INVALID_EMAIL_2 = 'emailcom@';
export const INVALID_EMAIL_3 = 'alguem@email.';
export const INVALID_PASSWORD = '23456';

describe('Login', () => {
  test('testa Login', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveTextContent('');
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveTextContent('');
    const buttonInput = screen.getByTestId('button-input');
    expect(buttonInput).toBeInTheDocument();
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    userEvent.click(buttonInput);
    expect(buttonInput.disabled).toBeTruthy();
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(buttonInput);
    expect(buttonInput.disabled).toBeFalsy();
  });
});
