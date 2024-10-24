import { useEffect, useState } from 'react';
import CookDashboard from './CookDashboard';
import FoodieDashboard from './FoodieDashboard';
import Login from './Login';

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setRole(user.role);
    }
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
    return <Login />;
  }
};

export default App;
