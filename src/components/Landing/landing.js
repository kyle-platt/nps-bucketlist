import React from 'react';
import { Link } from 'react-router-dom';
import { withoutAuthorization } from '../Session/session';
import * as ROUTES from '../../constants/routes';

const Landing = () => {
    return (
        <div className="app-background">
            <h1>Landing</h1>
            <Link to={ROUTES.SIGN_IN}>
                <button type="button">Sign In</button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
                <button type="button">Sign Up</button>
            </Link>
        </div>
    );
};

export default withoutAuthorization()(Landing);
