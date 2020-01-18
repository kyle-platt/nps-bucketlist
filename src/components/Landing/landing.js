import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function Landing() {
  return (
    <div className="app-background">
      <h1>Landing</h1>
      <Link to={ROUTES.SIGN_IN}>
        <button type="button">
          Sign In
        </button>
      </Link>
      <Link to={ROUTES.SIGN_UP}>
        <button type="button">
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default Landing;
