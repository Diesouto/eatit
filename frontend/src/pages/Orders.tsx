import React, { useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, Card, CardContent, Avatar, Divider } from '@mui/material';
import { shadows } from '@mui/system';

// Components
import { useAppContext } from "../utils/AppContext";
import OrderCard from '../components/Orders/OrderCard';
import Navbar from '../components/Navigation';

const OrdersPage: React.FC = () => {
  const [tab, setTab] = useState<'next' | 'history'>('next');

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: 'next' | 'history') => {
    if (newTab) setTab(newTab);
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        {/* Título */}
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
          Pedidos
        </Typography>

        {/* Switch entre Próximos e Historial */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={handleTabChange}
            sx={{
              boxShadow: 1,
              borderRadius: '24px',
              padding: '4px',
              '& .MuiToggleButton-root': {
                border: 0,
                borderRadius: '24px',
                padding: '8px 24px',
                textTransform: 'none',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                backgroundColor: 'var(--primary-color)',
                color: 'white',
              },
              '& .Mui-selected:hover': {
                backgroundColor: 'var(--primary-color)',
                color: 'white',
              },
            }}
          >
            <ToggleButton value="next">Próximos</ToggleButton>
            <ToggleButton value="history">Historial</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Sección de cards con scroll */}
        <Box
          sx={{
            margin: 'auto',
            padding: '1em',
            maxHeight: '70vh',
            maxWidth: '450px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            mb: 3,
          }}
        >
          {[1, 2, 3].map(order => (
            <OrderCard
              key={order}
              name="Ángel Pazos"
              price={350}
              dishes={3}
              orderId={162432}
              arrivalTime="25 mins"
              status="En camino"
            />
          ))}
        </Box>
      </Box>
      <Navbar/>
    </>
  );
};

export default OrdersPage;
