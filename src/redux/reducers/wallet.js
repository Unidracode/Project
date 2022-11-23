import {
  SUBMIT_CURRENCY_API,
  SUBMIT_EXPENSES,
  SUBMIT_ARRAY_EXPENSES,
  SUBMIT_SUM_VALUE,
  EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  allValueBRL: 0,
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_CURRENCY_API: {
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies),
    };
  }
  case SUBMIT_EXPENSES: {
    return {
      ...state,
      expenses: state.expenses.concat(action.payload.expenses),
    };
  }
  case SUBMIT_ARRAY_EXPENSES: {
    return {
      ...state,
      expenses: action.payload.expenses,
      editor: false,
    };
  }
  case SUBMIT_SUM_VALUE: {
    return {
      ...state,
      allValueBRL: action.payload.allValueBRL,
      editor: false,
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      idToEdit: action.payload.idToEdit,
      editor: true,
    };
  }
  default: return state;
  }
};

export default wallet;
