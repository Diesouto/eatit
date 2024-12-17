import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BackButtonProps {
  to: string;
  title: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to="/", title="" }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <IconButton onClick={() => navigate(to)}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default BackButton;
