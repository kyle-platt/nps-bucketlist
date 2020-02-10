import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

const withoutAuthorization = () => Component => {
    class WithoutAuthorization extends React.Component {
        componentDidMount() {
            const { firebase, history } = this.props;
            this.listener = firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    history.push(ROUTES.DASHBOARD);
                }
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        !authUser ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(withFirebase(WithoutAuthorization));
};

export default withoutAuthorization;
