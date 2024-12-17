import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

// Components
import { useAppContext } from "../utils/AppContext";
import BackButton from '../components/BackButton';

const Login: React.FC = () => {
  const { backendUrl, setUserId } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUserId(user.id);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <BackButton to="/start" title="Login"/>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
          Login
        </Button>
      </Box>

      <Button
        onClick={() => navigate('/signin')}
        sx={{ mt: 2 }}
        color="secondary"
      >
        Don't have an account? Sign Up
      </Button>
    </Box>
  );
};

export default Login;
