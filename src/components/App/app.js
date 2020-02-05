import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './app.css'
import LandingPage from '../Landing/landing';
import SignUpPageContainer from '../SignUp/SignUpPageContainer';
import SignIn from '../SignIn/SignIn';
import PasswordForgetPage from '../PasswordForget/passwordForget';
import DashboardPage from '../Dashboard/dashboard';
import SettingsPage from '../Settings/SettingsPage';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session/session';

const App = () => (
  <Router>
    <Route exact path={ROUTES.LANDING} component={LandingPage} />
    <Route path={ROUTES.SIGN_UP} component={SignUpPageContainer} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
    <Route path={ROUTES.SETTINGS} component={SettingsPage} />
  </Router>
);

export default withAuthentication(App);
