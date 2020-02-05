import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';

const SignIn = ({
  firebase,
  history,
}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    return firebase.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError(null);
        history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <div className="app-background">
        <Link to={ROUTES.LANDING}>back</Link>
        <h1>Let's sign you in</h1>
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
            />
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
            <button type="submit">
                Sign In
            </button>
            {
                error && (
                <p>
                    {error.message}
                </p>
            )}
        </form>
        <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
    </div>
  );
}

export default withoutAuthorization()(withRouter(withFirebase(SignIn)));
export { SignIn as SignInTest };