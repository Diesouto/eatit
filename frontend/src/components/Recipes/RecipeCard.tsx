import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../../types/Recipe'; // Assuming Recipe type is defined in a types file

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/show-recipe/${recipe._id}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body">
        <h3 className="card-title">{recipe.name}</h3>
        <p className="card-text">{recipe.description}</p>
        <p>Delivery Date: {new Date(recipe.deliveryDate).toLocaleDateString()}</p>
        <p>Status: {recipe.status}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
