import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

// Components
import Header from '../../components/Dashboard/Header';
import SearchBar from '../../components/SearchBar';
import AnnouncementCard from '../../components/Dashboard/AnnouncementCard';
import IconButtonGrid from '../../components/Dashboard/IconButtonGrid';
import RecipeList from '../../components/Recipes/RecipeList';
import Navbar from '../../components/Navigation';
import { Recipe } from '../../types/Recipe';
import { useAppContext } from '../../utils/AppContext';

const FoodieDashboard: React.FC = () => {
  const { backendUrl } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: 'var(--navbar-height)' }}>
      <Header />
      <main role="main" className='container'>
        <SearchBar />
        <AnnouncementCard />
        <IconButtonGrid />
        <Box sx={{ padding: '16px' }}>
          <section className='d-flex justify-content-between align-items-center'>
            <Typography variant="h6">Recetas preto de ti</Typography>
            <Typography>Ver todas</Typography>
          </section>
          <RecipeList recipes={recipes} />
        </Box>
      </main>
      <Navbar />
    </Box>
  );
};

export default FoodieDashboard;
