import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';  // Provisional icon for the app logo

const StarterPage: React.FC = () => {
  const navigate = useNavigate();

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
      {/* App Logo (Provisional Icon) */}
      <IconButton sx={{ mb: 2 }}>
        <RestaurantIcon fontSize="large" />
      </IconButton>

      {/* App Name */}
      <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
        Eatit!
      </Typography>

      {/* Primary Button: LogIn */}
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '100%', mb: 2, maxWidth: 400 }}
        onClick={() => navigate('/login')}
      >
        Log In
      </Button>

      {/* Secondary Button: SignIn */}
      <Button
        variant="outlined"
        color="secondary"
        sx={{ width: '100%', maxWidth: 400 }}
        onClick={() => navigate('/signin')}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default StarterPage;
