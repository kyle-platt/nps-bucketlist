import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut/signOutButton';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import { AuthUserContext, withAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';

const Settings = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div className="app-background">
                <Link to={ROUTES.DASHBOARD}>back</Link>
                <h1>Hi {authUser.email}</h1>
                <span>Change Password:</span>
                <PasswordChangeForm />
                <br />
                <SignOutButton />
            </div>
        )}
    </AuthUserContext.Consumer>
);

export default withAuthorization()(Settings);
