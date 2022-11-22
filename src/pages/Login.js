import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitEmail as submitEmailAction } from '../redux/actions/index';

const PASSWORD_LENGTH = 5;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  handleChange = (event) => {
    const { email, password } = this.state;
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
    if (email.includes('@')
      && email.includes('.com')
      && password.length >= PASSWORD_LENGTH
    ) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleSubmit = () => {
    const { submitEmail } = this.props;
    const { email } = this.state;
    submitEmail(email);
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <div>
        <input
          name="email"
          type="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="submit"
            disabled={ btnDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  submitEmail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (param) => (
    dispatch(submitEmailAction(param))),
});

export default connect(null, mapDispatchToProps)(Login);
