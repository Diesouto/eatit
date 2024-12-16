import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
} from '@mui/material';

// Components
import { useAppContext } from "../utils/AppContext";
import RecipeList from '../components/Recipes/RecipeList';
import BackButton from '../components/BackButton';

const Cart: React.FC = () => {
  const { backendUrl, userId } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPrice, setTotalPrice] = useState<Number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCartRecipes()
    };
  }, [userId]);

  useEffect(() => {
    if (recipes) {
      calculateTotalPrice()
    };
  }, [recipes]);

  const fetchCartRecipes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/cart`, {
        params: { userId },
      });
      setRecipes(response.data || []);
      calculateTotalPrice(recipes);
    } catch (err) {
      console.error('Error fetching cart recipes:', err);
      setRecipes([]);
    }
  };

  const calculateTotalPrice = () => {
    const price = recipes.reduce((acc, currentValue) => acc + (currentValue.price || 0), 0);
    setTotalPrice(price);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/orders/create`, {
        userId,
        recipes,
        totalPrice,
      });
  
      if (response.status === 201) {
        setRecipes([]);
        navigate('/orders');
      }
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <BackButton title="Carro"/>

      {/* Cart Recipe List */}
      <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 2 }}>
        <RecipeList recipes={recipes} useCartView />
      </Box>

      {/* Resumen del pago y botones */}
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
        <Typography>{totalPrice}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Descuento aplicable:</Typography>
        <Typography>0€</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Cargo por envío:</Typography>
        <Typography>0€ (Recogida)</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Total section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">{totalPrice}</Typography>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="secondary" sx={{ width: '48%' }} onClick={() => navigate('/some-path')}>
          Añadir más
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '48%' }}
          onClick={handlePayment}
        >
          Pagar
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
