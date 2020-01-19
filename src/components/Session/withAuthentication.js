import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        isAuthenticating: true,
      };
    }

    getAuth = () => (
      new Promise((resolve, reject) => {
        this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            if (authUser) {
              this.setState({ authUser });
            } else {
              this.setState({ authUser: null })
            }
            resolve(this.state.authUser);
          }
        );
     })
    );
    
    componentDidMount() {
      this.getAuth().then(() => this.setState({ isAuthenticating: false }))
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          {
            this.state.isAuthenticating ? null : <Component {...this.props} />
          }
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;