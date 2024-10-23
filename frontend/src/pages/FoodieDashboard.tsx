import React from 'react'

// Components
import LogoutButton from '../components/LogoutButton';

const FoodieDashboard = () => {
  return (
    <div>
      <h1>Welcome, Foodie!</h1>
      <p>Here you can explore and join recipes.</p>
      <LogoutButton/>
    </div>
  );
};
  
export default FoodieDashboard;
  