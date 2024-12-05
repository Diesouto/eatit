import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import { useAppContext } from "../../utils/AppContext";
import RecipeDetails from '../../components/Recipes/RecipeDetails';

const CookRecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const { backendUrl } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error('Error fetching recipe:', err));
  }, [id, backendUrl]);

  const onDeleteClick = async () => {
    try {
      await axios.delete(`${backendUrl}/api/recipes/${id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  return (
    <div className='container'>
      <Link to='/' className='btn btn-outline-warning'>Back to Recipes</Link>
      <h1 className='text-center'>Cook Recipe Detail</h1>
      <RecipeDetails recipe={recipe} />
      <div className='mt-3'>
        <button className='btn btn-danger' onClick={onDeleteClick}>
          Delete Recipe
        </button>
        <Link to={`/edit-recipe/${recipe._id}`} className='btn btn-info ml-2'>
          Edit Recipe
        </Link>
      </div>
    </div>
  );
};

export default CookRecipeDetail;
