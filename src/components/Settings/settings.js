import React from 'react';
import SignOutButton from '../SignOut/signOut';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import { AuthUserContext, withAuthorization } from '../Session/session';

const SettingsPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="app-background">
        <h1>Hi {authUser.email}</h1>
        <span>Change Password:</span>
        <PasswordChangeForm />
        <br/>
        <SignOutButton />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default withAuthorization()(SettingsPage);
