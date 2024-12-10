import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Map routes to indices
  const routeToIndex = {
    '/': 0,
    '/orders': 1,
    '/favorites': 2,
    '/account': 3,
  };

  const indexToRoute = {
    0: '/',
    1: '/orders',
    2: '/favorites',
    3: '/account',
  };

  const [value, setValue] = useState(routeToIndex[location.pathname] || 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(indexToRoute[newValue]);
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
        <BottomNavigationAction label="Pedidos" icon={<ListAltIcon />} />
        <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Cuenta" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
