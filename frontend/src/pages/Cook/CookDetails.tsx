import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Divider,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Components
import { useAppContext } from "../../utils/AppContext";

interface Recipe {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
}

interface CookDetails {
  name: string;
  location: string;
  rating: number;
  recipes: number;
  price: number;
}

const CookDetails = () => {
  const { backendUrl } = useAppContext();
  const { id: cookId } = useParams();
  const navigate = useNavigate();

  const [cookDetails, setCookDetails] = useState<CookDetails | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchCookDetails();
    fetchRecipes();
  }, [cookId]);

  const fetchCookDetails = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/cook/${cookId}`);
      setCookDetails(data);
    } catch (err) {
      console.error("Error fetching cook details:", err);
    }
  };

  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/${cookId}/recipes`);
      setRecipes(data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  if (!cookDetails) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
      {/* Back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Cook Detail</Typography>
      </Box>

      {/* Header with cook details */}
      <Card>
        <CardMedia
          component="img"
          height="200"
          image="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D" // Actualiza la imagen
          alt={cookDetails.name}
        />
        <CardContent>
          <Typography variant="h4">{cookDetails.name}</Typography>
          <Typography color="text.secondary">{cookDetails.location}</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Typography>⭐ {cookDetails.averageRating} Puntos</Typography>
            <Typography>📋 {cookDetails.recipeCount} Recetas</Typography>
            <Typography>💶 Desde {cookDetails.price}€</Typography>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      {/* Featured Recipes */}
      <Typography variant="h5" gutterBottom>
        Recetas destacadas
      </Typography>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} key={recipe.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image || "/path/to/default-recipe-image.jpg"}
                alt={recipe.name}
              />
              <CardContent>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {recipe.rating} ({recipe.reviews} reviews)
                </Typography>
                <Typography variant="body1" color="primary">
                  {recipe.price}€
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button onClick={() => window.location.href = '/cart'} variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
        Ver Carrito
      </Button>
    </Box>
  );
};

export default CookDetails;
