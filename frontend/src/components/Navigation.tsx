import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels
      >
        <BottomNavigationAction
          label="Inicio"
          icon={<HomeIcon />}
          onClick={() => handleNavigation('/')}
        />
        <BottomNavigationAction
          label="Pedidos"
          icon={<ListAltIcon />}
          onClick={() => handleNavigation('/orders')}
        />
        <BottomNavigationAction
          label="Favoritos"
          icon={<FavoriteIcon />}
          onClick={() => handleNavigation('/favorites')}
        />
        <BottomNavigationAction
          label="Cuenta"
          icon={<AccountCircleIcon />}
          onClick={() => handleNavigation('/account')}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
