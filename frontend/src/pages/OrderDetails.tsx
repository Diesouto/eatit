import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Chip, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

// Components
import { useAppContext } from "../utils/AppContext";
import Navbar from '../components/Navigation';
import BackButton from '../components/BackButton';

const OrderDetails: React.FC = () => {
  const { backendUrl, userId } = useAppContext();
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if(orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/${orderId}`);
      setOrder(response.data);
      setStatus(response.data.status);
      console.log(order)
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    try {
      await axios.put(`${backendUrl}/api/orders/${orderId}`, { status: newStatus });
      setStatus(newStatus);
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleCancelOrder = () => {
    updateOrderStatus('cancelled');
    navigate('/orders'); // Redirige a la lista de pedidos
  };

  if (!order) return <Typography>Cargando...</Typography>;

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <BackButton to="/cart" title="Estado"/>

        {/* Estado */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color="primary"
            sx={{ fontWeight: 'bold', backgroundColor: 'var(--primary-color)', color: 'white' }}
          />
        </Box>

        {/* Detalles de los platos */}
        {order.recipes.map((recipe: any) => (
          <Box key={recipe._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <img
              src={recipe.image || '/default-image.jpg'}
              alt={recipe.name}
              style={{ width: '60px', height: '60px', borderRadius: '8px', marginRight: '12px' }}
            />
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>{recipe.name}</Typography>
              <Typography>{recipe.price}€</Typography>
            </Box>
            <Typography sx={{ marginLeft: 'auto' }}>x{recipe.quantity}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Resumen del pedido */}
        <Box>
          <Typography>Cantidad: {order.recipes.length} items</Typography>
          <Typography>Precio envío: {order.deliveryFee}€</Typography>
          <Typography>Descuento: {order.discount}€</Typography>
          <Typography>Propinas: {order.tip}€</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>Total: {order.totalPrice}€</Typography>
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
          {status !== 'received' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => updateOrderStatus('received')}
            >
              Pedido recibido
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancelOrder}
          >
            Cancelar Pedido
          </Button>
        </Box>
      </Box>
      <Navbar />
    </>
  );
};

export default OrderDetails;
