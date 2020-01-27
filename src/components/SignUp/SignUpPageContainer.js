import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';
import SignUpPageView from './SignUpPageView';

export const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = (event) => {
    const { email, passwordOne } = this.state;
    const { firebase, history } = this.props;

    event.preventDefault();

    return firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isInvalid = (email, passwordOne, passwordTwo) => (
    email === '' || passwordOne === '' || passwordOne !== passwordTwo
  );

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    return (
      <SignUpPageView
      email={email}
      error={error}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      isInvalid={this.isInvalid(email, passwordOne, passwordTwo)}
      passwordOne={passwordOne}
      passwordTwo={passwordTwo}
      />
    );
  }
}

export default withoutAuthorization()(withRouter(withFirebase(SignUpPageContainer)));
export { SignUpPageContainer as SignUpPageContainerTest };