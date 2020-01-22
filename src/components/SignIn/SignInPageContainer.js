import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withoutAuthorization } from '../Session/session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import SignInPageView from './SignInPageView';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

    firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isInvalid = (email, password) => {
    return email === '' || password === '';
  }

  render() {
    const {
      email,
      error,
      password,
    } = this.state;

    return (
      <SignInPageView
        email={email}
        error={error}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        isInvalid={this.isInvalid()}
        password={password}
      />
    );
  }
}

export default withoutAuthorization()(withRouter(withFirebase(SignInPageContainer)));