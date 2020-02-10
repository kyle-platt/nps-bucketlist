import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';

const PasswordForget = ({ firebase }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail('');
                setError(null);
            })
            .catch(e => {
                setError(e);
            });
    };

    return (
        <div className="app-background">
            <Link to={ROUTES.SIGN_IN}>back</Link>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    type="text"
                    placeholder="Email Address"
                />
                <button type="submit">Send</button>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    );
};

export default withoutAuthorization()(withFirebase(PasswordForget));
