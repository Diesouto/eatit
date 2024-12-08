import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../../types/Recipe';
import { useAppContext } from '../../utils/AppContext';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const handleClick = () => {
    const route =
      userRole === 'foodie'
        ? `/recipes/foodie/${recipe._id}`
        : `/recipes/cook/${recipe._id}`;

    navigate(route);
  };

  return (
    <div
      style={{display: 'block'}}
      className="card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body p-2">
        <img style={{width: '150px', height: '150px'}} src={recipe.image}/>
        <section>
          <h3 className="card-title">{recipe.name}</h3>
          <p className="card-text">{recipe.description}</p>
          <p>Delivery Date: {new Date(recipe.deliveryDate).toLocaleDateString()}</p>
          <p>Status: {recipe.status}</p>
        </section>
      </div>
    </div>
  );
};

export default RecipeCard;
