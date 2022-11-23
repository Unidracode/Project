import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  submitArrayExpenses as submitArrayExpensesAction,
  editExpense as editExpenseAction,
} from '../redux/actions/index';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, submitArrayExpenses } = this.props;
    const newArrayExpenses = expenses.filter((e) => e.id !== id);
    submitArrayExpenses(newArrayExpenses);
  };

  render() {
    const { expenses, editExpense } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((e) => {
                const current = Object.values(e.exchangeRates !== undefined
                  && e.exchangeRates).find((coin) => coin.code === e.currency);
                return (
                  <tr key={ e.id }>
                    <td>{ e.description }</td>
                    <td>{ e.tag }</td>
                    <td>{ e.method }</td>
                    <td>{ Number(e.value).toFixed(2) }</td>
                    <td>{ current.name }</td>
                    <td>{ Number(current.ask).toFixed(2) }</td>
                    <td>{ (Number(current.ask) * e.value).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.deleteExpense(e.id) }
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => editExpense(e.id) }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  allValueBRL: state.wallet.allValueBRL,
});

const mapDispatchToProps = (dispatch) => ({
  submitArrayExpenses: (newArrayExpenses) => (
    dispatch(submitArrayExpensesAction(newArrayExpenses))),
  editExpense: (id) => (
    dispatch(editExpenseAction(id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
