import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignUpPageView = ({
    email,
    error,
    handleChange,
    handleSubmit,
    isInvalid,
    passwordOne,
    passwordTwo,
}) => (
    <div className="app-background">
        <Link to={ROUTES.LANDING}>back</Link>
        <h1>Let's get you signed up</h1>
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                value={email}
                onChange={handleChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={handleChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={handleChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">
                Sign Up
            </button>
            {
                error && (
                    <p>
                        {error.message}
                    </p>
                )
            }
        </form>
        <p>
            Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </p>
    </div>
);

export default SignUpPageView;
