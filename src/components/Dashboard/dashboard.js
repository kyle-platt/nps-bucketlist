import React from 'react';
import SignOutButton from '../SignOut/signOut';
import { withAuthorization } from '../Session/session';

function Dashboard() {
  return (
    <div className="app-background">
      <h1>Bucketlist</h1>
      <SignOutButton />
    </div>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);
