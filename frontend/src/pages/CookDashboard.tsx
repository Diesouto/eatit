import React from 'react'

// Components
import LogoutButton from '../components/LogoutButton';

const CookDashboard = () => {
  return (
    <div className="container">
      <h1>Welcome, Cocinero!</h1>
      <p>Here you can create and manage your recipes.</p>
      <LogoutButton/>
    </div>
  );
};
  
export default CookDashboard;
  