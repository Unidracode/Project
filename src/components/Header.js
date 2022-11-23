import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  allValue = () => {
    const { expenses } = this.props;
    const values = expenses.map((e) => {
      const arrayExchange = Object.entries(e.exchangeRates);
      const currentCurrency = arrayExchange.find((el) => el[0] === e.currency);
      return Number(e.value) * Number(currentCurrency[1].ask);
    });
    return values.reduce((partialSum, a) => partialSum + a, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">
          { this.allValue().toFixed(2) }
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  allValueBRL: state.wallet.allValueBRL,
});

export default connect(mapStateToProps)(Header);
