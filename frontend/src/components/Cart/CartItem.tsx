import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CartItemProps {
  recipe: {
    id: string;
    name: string;
    description: string;
    price?: number; 
    quantity: number;
    imageUrl: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ recipe }) => {
  const [showControls, setShowControls] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 2,
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Imagen */}
      <img
        src={recipe.image}
        alt={recipe.name}
        style={{ width: '80px', height: '80px', borderRadius: '8px', marginRight: '16px', objectFit: 'cover' }}
      />

      {/* Información */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ marginTop: 1 }}>
          {recipe.price ? `${recipe.price.toFixed(2)}€` : 'Precio no disponible'}
        </Typography>
      </Box>

      {/* Controles */}
      <Box
        sx={{
          display: showControls ? 'flex' : 'none',
          alignItems: 'center',
        }}
      >
        <IconButton>
          <RemoveIcon />
        </IconButton>
        <Typography sx={{ mx: 1 }}>{recipe.quantity}</Typography>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
