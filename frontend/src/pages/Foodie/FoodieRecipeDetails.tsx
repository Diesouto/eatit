import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Components
import { useAppContext } from "../../utils/AppContext";
import RecipeDetails from '../../components/Recipes/RecipeDetails';

const FoodieRecipeDetail = () => {
  const { backendUrl, userId } = useAppContext();
  const navigate = useNavigate();
  const { id: recipeId } = useParams();

  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (recipeId && userId) {
      fetchRecipe();
      fetchComments();
      fetchRatings();
      fetchParticipationStatus();
    }
  }, [recipeId, userId]);

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes/${recipeId}`);
      setRecipe(data);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }
  };

  const fetchParticipationStatus = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/subscriptions/${recipeId}/is-subscribed`, {
        params: { userId },
      });
      setIsParticipant(data.isSubscribed);
    } catch (error) {
      console.error('Error checking participation status:', error);
    }
  };

  const handleJoinRecipe = async () => {
    try {
      if (!userId) {
        alert('User ID is not available. Please log in.');
        return;
      }
      await axios.post(`${backendUrl}/api/subscriptions/${recipeId}/join`, { recipeId, userId });
      alert('Successfully signed up for the recipe!');
      setIsParticipant(true);
    } catch (err) {
      console.error('Error signing up:', err);
      alert('Error signing up for the recipe. Please try again.');
    }
  };

  const handleRemoveFromRecipe = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/subscriptions/${recipeId}/remove`, {
        params: { recipeId, userId },
      });
      if (data.length > 0) {
        await axios.delete(`${backendUrl}/api/subscriptions/${data[0]._id}`);
        setIsParticipant(false);
        alert('You have been removed from the recipe.');
      }
    } catch (error) {
      console.error('Error removing from the recipe:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/comments/${recipeId}`, {
        params: { recipeId },
      });
      setComments(data);

      const userEntry = data.find((c) => String(c.userId._id) === String(userId));
      if (userEntry) {
        setUserComment(userEntry.comment || '');
        setUserRating(userEntry.rating || 0);
      } else {
        setUserComment('');
        setUserRating(0);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };


  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/comments/${recipeId}/average-rating`);
      setAverageRating(Number(data.averageRating));
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };

  const handleEditComment = async () => {
    try {
      const payload = { recipeId, userId, comment: userComment, rating: userRating };
      await axios.post(`${backendUrl}/api/comments/${recipeId}`, payload);
      alert("Your comment and rating have been updated!");
      fetchComments();
      fetchRatings();
    } catch (err) {
      console.error("Error updating comment and rating:", err);
    }
  };

  return (
    <div className='container'>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Foodie Recipe Detail</Typography>
      </Box>

      <RecipeDetails
        recipe={recipe}
        isParticipant={isParticipant}
        onJoinRecipe={handleJoinRecipe}
        onRemoveRecipe={handleRemoveFromRecipe}
        comments={comments}
        averageRating={averageRating}
        userComment={userComment}
        userRating={userRating}
        setUserComment={setUserComment}
        setUserRating={setUserRating}
        onSubmitComment={handleEditComment}
      />
    </div>
  );
};

export default FoodieRecipeDetail;
