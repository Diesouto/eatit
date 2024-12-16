import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom'; // Importa Link

interface OrderCardProps {
  name: string;
  price: number;
  dishes: number;
  orderId: number;
  arrivalTime: string;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ name, price, dishes, orderId, arrivalTime, status }) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        boxShadow: 1,
        borderRadius: '12px',
      }}
    >
      <CardContent>
        {/* Información principal */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src="https://via.placeholder.com/150"
            alt={name}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              {name} <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 18, ml: 1 }} />
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Rs. {price} · {dishes} platos
            </Typography>
          </Box>
          <Typography variant="body2" color="primary">
            #{orderId}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Detalles adicionales */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Chegada estimada
            </Typography>
            <Typography variant="body1">{arrivalTime}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Estado
            </Typography>
            <Typography variant="body1">{status}</Typography>
          </Box>
        </Box>

        {/* Botones */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" sx={{ borderRadius: '20px', px: 3 }}>
            Cancelar
          </Button>
          {/* Agrega el Link aquí */}
          <Link to={`/order/${orderId}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '20px', px: 3 }}
            >
              Seguir pedido
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
