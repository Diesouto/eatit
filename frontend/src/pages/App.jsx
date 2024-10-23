import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CookDashboard from './CookDashboard';
import FoodieDashboard from './FoodieDashboard';

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === 'cocinero') {
    return <CookDashboard />;
  } else if (role === 'foodie') {
    return <FoodieDashboard />;
  } else {
    return <Navigate to="/login" />;;
  }
};

export default App;
