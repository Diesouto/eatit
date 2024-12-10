import React from 'react';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: '#2196f3',
        color: '#fff',
        borderRadius: '0 0 16px 16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
        <Box sx={{ marginLeft: '8px' }}>
          <Typography variant="subtitle2">Enderezo actual</Typography>
          <Typography variant="body2">
            <FmdGoodIcon style={{ fontSize: 18, paddingBottom: '4px' }} />
            Vigo, Pontevedra
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={() => window.location.href = '/cart'} sx={{ color: '#fff' }}>
          <ShoppingCartIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Notifications clicked')} sx={{ color: '#fff' }}>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
