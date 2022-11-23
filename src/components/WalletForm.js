import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import currencyAPI from '../services/requestAPI';
import {
  submitExpenses as submitExpensesAction,
  submitAllValue as submitAllValueAction,
  submitArrayExpenses as submitArrayExpensesAction,
  fetchCurrency,
} from '../redux/actions/index';

const food = 'Alimentação';
class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: food,
    sumAllExpenses: 0,
  };

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI = async () => {
    const { submitCurrencyAPI } = this.props;
    await submitCurrencyAPI();
  };

  fetchCurrencyCurrent = async () => {
    const response = await currencyAPI();
    delete response.USDT;
    return response;
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { submitExpenses, expenses, submitAllValue } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      sumAllExpenses,
    } = this.state;
    const exchangeCurrent = await this.fetchCurrencyCurrent();
    const objExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeCurrent,
    };
    submitExpenses(objExpense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    });
    const numberValue = Number(value);
    const exchange = exchangeCurrent[currency].ask;
    const valueBRL = exchange * numberValue;
    const allValue = sumAllExpenses + valueBRL;
    submitAllValue(allValue);
    this.setState({ sumAllExpenses: allValue });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmitFormEdit = async (event) => {
    event.preventDefault();
    const { expenses, idToEdit, submitArrayExpenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expenseCurrent = expenses.find((e) => e.id === idToEdit);
    const expenseEdit = {
      value,
      description,
      currency,
      method,
      tag,
      id: idToEdit,
      exchangeRates: expenseCurrent.exchangeRates,
    };
    const arrayDeleteExpense = expenses.filter((e) => e.id !== idToEdit);
    submitArrayExpenses(arrayDeleteExpense);
    const newArrayExpenses = [...arrayDeleteExpense, expenseEdit];
    submitArrayExpenses(newArrayExpenses.sort((a, b) => a.id - b.id));
  };

  render() {
    const { currencies, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            <input
              name="value"
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            <input
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {
                currencies.map((elCurrency, index) => (
                  <option key={ index }>{ elCurrency }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="submit"
            onClick={ editor ? this.handleSubmitFormEdit : this.handleSubmitForm }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  submitCurrencyAPI: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  allValueBRL: state.wallet.allValueBRL,
});

const mapDispatchToProps = (dispatch) => ({
  submitCurrencyAPI: () => (
    dispatch(fetchCurrency())),
  submitExpenses: (objExpense) => (
    dispatch(submitExpensesAction(objExpense))),
  submitAllValue: (allValueBRL) => (
    dispatch(submitAllValueAction(allValueBRL))),
  submitArrExpenses: (newArrayExpenses) => (
    dispatch(submitArrayExpensesAction(newArrayExpenses))),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
