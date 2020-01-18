import React from 'react';
import { withAuthorization } from '../Session/session';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function Dashboard() {
  return (
    <div className="app-background">
      <h1>Bucketlist</h1>
      <Link to={ROUTES.SETTINGS}>
        <button type="button">
          Settings
        </button>
      </Link>
    </div>
  );
}

export default withAuthorization()(Dashboard);
