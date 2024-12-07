import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Components
import { useAppContext } from "../../utils/AppContext";
import RecipeDetails from '../../components/Recipes/RecipeDetails';

const FoodieRecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { backendUrl, userId } = useAppContext();
  const [isParticipant, setIsParticipant] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id && userId) {
      fetchParticipationStatus();
    }
  }, [id, userId]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error('Error fetching recipe:', err));
  }, [id, backendUrl]);

  const handleJoinRecipe = async () => {
    try {
      if (!userId) {
        alert('User ID is not available. Please log in.');
        return;
      }
  
      await axios.post(`${backendUrl}/api/recipes/${id}/join`, { userId });
      alert('Successfully signed up for the recipe!');
      setIsParticipant(true);
    } catch (err) {
      console.error('Error signing up:', err);
      alert('Error signing up for the recipe. Please try again.');
    }
  };  

  const handleRemoveFromRecipe = async () => {
    try {
      await axios.post(`${backendUrl}/api/recipes/${id}/remove-participant`, { userId });
      setIsParticipant(false);
      alert('You have been removed from the recipe.');
    } catch (error) {
      console.error('Error removing from the recipe:', error);
    }
  };

  const handleRateAndComment = async () => {
    try {
      const payload = { rating, comment, userId };
      await axios.post(`${backendUrl}/api/recipes/${id}/rate-comment`, payload);
      alert('Rating and comment submitted successfully!');
    } catch (err) {
      console.error('Error submitting rating and comment:', err);
    }
  };

  const fetchParticipationStatus = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes/${id}/is-participant`, {
        params: { userId },
      });
      setIsParticipant(data.isParticipant);
    } catch (error) {
      console.error('Error checking participation status:', error);
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Foodie Recipe Detail</h1>
      <RecipeDetails recipe={recipe} />
      <div className='mt-3'>
        <div>
          {isParticipant ? (
            <button onClick={handleRemoveFromRecipe} className="btn btn-warning">
              Remove from Recipe
            </button>
          ) : (
            <button onClick={handleJoinRecipe} className="btn btn-success">
              Sign Up for Recipe
            </button>
          )}
        </div>

        <div className='mt-3'>
          <section className="col-6">
            <h3>Rate this Recipe</h3>
            <input
              type='number'
              min='1'
              max='5'
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className='form-control'
            />
          </section>
          <section className="col-6">
            <h3>Leave a Comment</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='form-control'
            ></textarea>
          </section>
          <button className='btn btn-info mt-2' onClick={handleRateAndComment}>
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodieRecipeDetail;
