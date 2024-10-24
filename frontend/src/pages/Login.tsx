import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../utils/AppContext";
import axios from 'axios';

const Login: React.FC = () => {
  const { backendUrl } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/')
    } catch (error) {
      console.error('Error during login:', error);
      alert('Invalid credentials. Please try again.');
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
