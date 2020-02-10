import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';

const SignUp = ({ firebase, history }) => {
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        return firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(() => {
                setEmail('');
                setPasswordOne('');
                setPasswordTwo('');
                setError(null);
                history.push(ROUTES.DASHBOARD);
            })
            .catch(e => {
                setError(e);
            });
    };

    return (
        <div className="app-background">
            <Link to={ROUTES.LANDING}>back</Link>
            <h1>Let&apos;s get you signed up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={event => setPasswordOne(event.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={event => setPasswordTwo(event.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
            <p>
                Already have an account?{' '}
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </p>
        </div>
    );
};

export default withoutAuthorization()(withRouter(withFirebase(SignUp)));
export { SignUp as SignUpTest };
