import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AnnouncementCard: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        padding: '16px',
        paddingLeft: '24px',
        margin: '16px',
      }}
    >
      <Typography variant="h6" fontWeight="bold">Obtén descuentos</Typography>
      <Typography variant="body2">ata o 75%</Typography>
      <Button variant="contained" sx={{ marginTop: '8px' }}>Obter cupón</Button>
    </Box>
  );
};

export default AnnouncementCard;
