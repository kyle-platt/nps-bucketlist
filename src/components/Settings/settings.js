import React from 'react';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import { AuthUserContext, withAuthorization } from '../Session/session';

const SettingsPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="app-background">
        <h1>Hi {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SettingsPage);
