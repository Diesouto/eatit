import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Navbar from '../components/Navigation';
import OrderCard from '../components/Orders/OrderCard';
import { useAppContext } from "../utils/AppContext";

const OrdersPage: React.FC = () => {
  const { backendUrl, userId } = useAppContext();
  const [tab, setTab] = useState<'next' | 'history'>('next');
  const [orders, setOrders] = useState<{ nextOrders: any[]; historyOrders: any[] }>({
    nextOrders: [],
    historyOrders: [],
  });

  useEffect(() => {
    if(userId) fetchOrders();
  }, [userId]);

  const handleTabChange = (event: React.MouseEvent<HTMLElement>, newTab: 'next' | 'history') => {
    if (newTab) setTab(newTab);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/user/${userId}`);
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
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

        {/* Cards */}
        <Box sx={{ maxHeight: '70vh', overflowY: 'auto', mb: 3 }}>
          {(tab === 'next' ? orders.nextOrders : orders.historyOrders).map(order => (
            <OrderCard
              key={order._id}
              name={order.recipes.map(recipe => recipe.name).join(', ')}
              price={order.totalPrice}
              dishes={order.recipes.length}
              orderId={order._id}
              arrivalTime="25 mins"
              status={order.status}
            />
          ))}
        </Box>
      </Box>
      <Navbar />
    </>
  );
};

export default OrdersPage;
