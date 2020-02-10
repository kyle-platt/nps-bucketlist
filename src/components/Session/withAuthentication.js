import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
                isAuthenticating: true
            };
        }

        componentDidMount() {
            this.getAuth().then(() =>
                this.setState({ isAuthenticating: false })
            );
        }

        getAuth = () =>
            new Promise(resolve => {
                const { firebase } = this.props;
                const { authUser } = this.state;
                firebase.auth.onAuthStateChanged(authUserDetails => {
                    if (authUserDetails) {
                        this.setState({ authUser: authUserDetails });
                    } else {
                        this.setState({ authUser: null });
                    }
                    resolve(authUser);
                });
            });

        render() {
            const { authUser, isAuthenticating } = this.state;
            return (
                <AuthUserContext.Provider value={authUser}>
                    {isAuthenticating ? null : <Component {...this.props} />}
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
};

export default withAuthentication;
