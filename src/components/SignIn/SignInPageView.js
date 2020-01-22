import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignInPageView = ({
    email,
    error,
    handleChange,
    handleSubmit,
    isInvalid,
    password,
}) => {
    return (
        <div className="app-background">
            <Link to={ROUTES.LANDING}>back</Link>
            <h1>Let's sign you in</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                />
                <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
                <button disabled={isInvalid} type="submit">
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

export default SignInPageView;
