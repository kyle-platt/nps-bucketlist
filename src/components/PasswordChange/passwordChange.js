import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

const PasswordChange = ({ firebase }) => {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                setPasswordOne('');
                setPasswordTwo('');
                setError(null);
            })
            .catch(e => {
                setError(e);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={event => setPasswordOne(event.target.value)}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={event => setPasswordTwo(event.target.value)}
                type="password"
                placeholder="Confirm New Password"
            />
            <button type="submit">Reset</button>
            {error && <p>{error.message}</p>}
        </form>
    );
};

export default withFirebase(PasswordChange);
