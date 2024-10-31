import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from "../utils/AppContext";
import LogoutButton from '../components/LogoutButton';

export interface Recipe {
  _id?: string;
  name: string;
  image: string;
  description: string;
  ingredients: string[]; 
  creationDate?: string;
  deliveryDate: string;
  unitsAvailable: number;
  slots: number;
  isActive?: boolean;
  chefId: string;
}

const CookDashboard: React.FC = () => {
  const { backendUrl } = useAppContext();
  const chefId = JSON.parse(localStorage.getItem('user')!).id;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    name: '',
    image: '',
    description: '',
    ingredients: [],
    deliveryDate: '',
    unitsAvailable: 0,
    slots: 0,
    chefId: '',
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/recipes`, {
        params: {
          chefId,
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Handle input change for new recipe form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: name === 'ingredients' ? value.split(',') : value,
    }));
  };

  // Create a new recipe
  const handleCreateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(newRecipe)
      const response = await axios.post<Recipe>(`${backendUrl}/api/recipes`, newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
      setNewRecipe({
        name: '',
        image: '',
        description: '',
        ingredients: [],
        deliveryDate: '',
        unitsAvailable: 0,
        slots: 0,
        chefId: chefId,
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  // Delete a recipe
  const handleDeleteRecipe = async (id: string) => {
    try {
      await axios.delete(`${backendUrl}/api/recipes/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome, Cocinero!</h1>
      <p>Here you can create and manage your recipes.</p>
      <LogoutButton />

      <h2>Create a New Recipe</h2>
      <form onSubmit={handleCreateRecipe}>
        <input
          type="text"
          name="name"
          value={newRecipe.name}
          onChange={handleInputChange}
          placeholder="Recipe Name"
          required
        />
        <input
          type="text"
          name="image"
          value={newRecipe.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={newRecipe.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="ingredients"
          value={newRecipe.ingredients.join(', ')}
          onChange={handleInputChange}
          placeholder="Ingredients (comma separated)"
          required
        />
        <input
          type="date"
          name="deliveryDate"
          value={newRecipe.deliveryDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="unitsAvailable"
          value={newRecipe.unitsAvailable}
          onChange={handleInputChange}
          placeholder="Units Available"
          required
        />
        <input
          type="number"
          name="slots"
          value={newRecipe.slots}
          onChange={handleInputChange}
          placeholder="Slots"
          required
        />
        <button type="submit">Create Recipe</button>
      </form>

      <h2>Your Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} width="100" />
            <p>{recipe.description}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Delivery Date: {recipe.deliveryDate}</p>
            <p>Units Available: {recipe.unitsAvailable}</p>
            <p>Slots: {recipe.slots}</p>
            <button onClick={() => handleDeleteRecipe(recipe._id || '')}>Delete</button>
            {/* Puedes añadir más funcionalidades como editar aquí */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CookDashboard;
