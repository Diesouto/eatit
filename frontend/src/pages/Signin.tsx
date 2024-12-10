import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from "../utils/AppContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Registration: React.FC = () => {
  const { backendUrl, setUserId } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('foodie');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${backendUrl}/api/signin`, {
        name,
        email,
        password,
        role,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUserId(user.id);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      <IconButton onClick={() => navigate('/start')} sx={{ alignSelf: 'start', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

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

        <TextField
          fullWidth
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          sx={{ mb: 3 }}
        >
          <MenuItem value="foodie">Foodie</MenuItem>
          <MenuItem value="cocinero">Cocinero</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Registration;
