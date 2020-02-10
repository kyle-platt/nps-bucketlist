import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import Landing from '../Landing/landing';
import SignUp from '../SignUp/signUp';
import SignIn from '../SignIn/signIn';
import PasswordForget from '../PasswordForget/passwordForget';
import Dashboard from '../Dashboard/dashboard';
import Settings from '../Settings/settings';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session/session';

const App = () => (
    <Router>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.DASHBOARD} component={Dashboard} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
    </Router>
);

export default withAuthentication(App);
