import React from 'react';
import { Recipe } from '../../types/Recipe'; // Assuming Recipe type is defined in a types file

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="card mb-4">
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
      <p>Delivery Date: {new Date(recipe.deliveryDate).toLocaleDateString()}</p>
      <p>Status: {recipe.status}</p>
    </div>
  );
};

export default RecipeCard;
