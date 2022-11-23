import currencyAPI from '../../services/requestAPI';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: {
    email,
  },
});

export const SUBMIT_CURRENCY_API = 'SUBMIT_CURRENCY_API';
export const submitCurrencyApi = (currencies) => ({
  type: SUBMIT_CURRENCY_API,
  payload: {
    currencies,
  },
});

export const fetchCurrency = () => async (dispatch) => {
  const response = await currencyAPI();
  delete response.USDT;
  dispatch(submitCurrencyApi(response));
};

export const SUBMIT_EXPENSES = 'SUBMIT_EXPENSES';
export const submitExpenses = (expenses) => ({
  type: SUBMIT_EXPENSES,
  payload: {
    expenses,
  },
});

export const SUBMIT_ARRAY_EXPENSES = 'SUBMIT_ARRAY_EXPENSES';
export const submitArrayExpenses = (expenses) => ({
  type: SUBMIT_ARRAY_EXPENSES,
  payload: {
    expenses,
  },
});

export const SUBMIT_SUM_VALUE = 'SUBMIT_SUM_VALUE';
export const submitAllValue = (allValueBRL) => ({
  type: SUBMIT_SUM_VALUE,
  payload: {
    allValueBRL,
  },
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (idToEdit) => ({
  type: EDIT_EXPENSE,
  payload: {
    idToEdit,
  },
});
