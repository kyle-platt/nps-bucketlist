import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';
import SignInPageView from './SignInPageView';

export const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;
    
    event.preventDefault();

    return firebase.doSignInWithEmailAndPassword(email, password)
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
        password={password}
      />
    );
  }
}

export default withoutAuthorization()(withRouter(withFirebase(SignInPageContainer)));
export { SignInPageContainer as SignInPageContainerTest };
