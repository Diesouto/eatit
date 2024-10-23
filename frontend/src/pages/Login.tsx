import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Mocks
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate an API call to authenticate the user
    if (email === 'cook@example.com' && password === '123') {
      localStorage.setItem('userRole', 'cocinero');
      navigate('/');
    } else if (email === 'foodie@example.com' && password === '123') {
      localStorage.setItem('userRole', 'foodie');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
