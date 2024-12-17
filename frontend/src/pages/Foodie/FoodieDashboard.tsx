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
  const { backendUrl, userId } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedType, setSelectedType] = useState<string | null>(null); // Track selected type

  const address = defaultAddress ? `${defaultAddress.street}, ${defaultAddress.city}` : null;

  useEffect(() => {
    if (userId) {
      fetchRecipes();
      fetchDefaultAddress();
    }
  }, [userId, selectedType]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/recipes`, {
        params: {
          type: selectedType,
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/${userId}/default-address`);
      setDefaultAddress(data.defaultAddress);
    } catch (err) {
      console.error("Error al obtener la dirección predeterminada:", err.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: 'var(--navbar-height)' }}>
      <Header address={address} />
      <main role="main" className='container'>
        <SearchBar />
        <AnnouncementCard />
        <IconButtonGrid onTypeSelect={setSelectedType} /> {/* Pass callback */}
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
