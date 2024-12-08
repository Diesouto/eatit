import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

// Components
import { Recipe } from '../../types/Recipe';
import { useAppContext } from "../../utils/AppContext";
import LogoutButton from '../../components/LogoutButton';
import RecipeList from '../../components/Recipes/RecipeList';
import Navbar from '../../components/Navigation';

const FoodieDashboard = () => {
  const { backendUrl } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API for this Cook
  const fetchRecipes = async () => {
    await axios.get(`${backendUrl}/api/recipes`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error('Error fetching recipes:', err);
      });
  };

  return (
    <>
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh',
        marginBottom: 'var(--navbar-height)'
      }}>
        <h1>Welcome, Foodie!</h1>
        <p>Here you can explore and join recipes.</p>
        <LogoutButton />

        <div className="container">
          <RecipeList recipes={recipes} />
        </div>
      </Box>
      <Navbar />
    </>
  );
};

export default FoodieDashboard;
