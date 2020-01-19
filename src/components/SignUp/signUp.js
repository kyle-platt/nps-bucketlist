import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { SignInLink } from '../SignIn/signIn';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div className="app-background">
    <Link to={ROUTES.LANDING}>back</Link>
    <h1>Let's get you signed up</h1>
    <SignUpForm />
    <SignInLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = event => {
    const { email, passwordOne } = this.state;
    const { firebase, history } = this.props;

    firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.handleChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default withoutAuthorization()(SignUpPage);

export { SignUpForm, SignUpLink };