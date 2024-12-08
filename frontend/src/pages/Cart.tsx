import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, IconButton, TextField, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2 }}>
      {/* Back button with title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Carro</Typography>
      </Box>

      {/* Scrollable section with recipe cards */}
      <Box sx={{ maxHeight: '200px', overflowY: 'auto', mb: 2 }}>
        {/* Example Recipe Cards */}
        {[...Array(5)].map((_, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Receta {index + 1}</Typography>
              <Typography variant="body2">Descripción de la receta...</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Payment summary section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Resumen del pago</Typography>
        <TextField
          label="Introduce un código promocional"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <Typography sx={{ paddingLeft: 2 }}>🎁</Typography>,
          }}
        />
      </Box>

      {/* Display flex for payment summary */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Subtotal:</Typography>
        <Typography>$10.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Descuento aplicable:</Typography>
        <Typography>-$2.00</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Cargo por envío:</Typography>
        <Typography>$3.00</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Total section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">$11.00</Typography>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="secondary" sx={{ width: '48%' }} onClick={() => navigate('/some-path')}>
          Añadir más
        </Button>
        <Button variant="contained" color="primary" sx={{ width: '48%' }} onClick={() => navigate('/payment')}>
          Pagar
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
