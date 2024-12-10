import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import { useAppContext } from "../../utils/AppContext";
import RecipeDetails from '../../components/Recipes/RecipeDetails';

const FoodieRecipeDetail = () => {
  const { backendUrl, userId } = useAppContext();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    if (id && userId) {
      fetchRecipe();
      fetchComments();
      fetchRatings();
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
      const payload = { userRating, userComment, userId };
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

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes/${id}`);
      setRecipe(data);
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes/${id}/comments`);
      setComments(data);

      // Set user's existing comment and rating (if any)
      const userEntry = data.find((c) => c.user.id === userId);
      if (userEntry) {
        setUserComment(userEntry.comment || '');
        setUserRating(userEntry.rating || 0);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipes/${id}/ratings`);
      setAverageRating(data.averageRating);
      setTotalRatings(data.totalRatings);
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };

  const handleEditComment = async () => {
    try {
      const payload = { comment: userComment, rating: userRating, userId };
      await axios.post(`${backendUrl}/api/recipes/${id}/rate-comment`, payload);
      alert("Your comment and rating have been updated!");
      fetchComments();
      fetchRatings();
    } catch (err) {
      console.error("Error updating comment and rating:", err);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Foodie Recipe Detail</h1>
      <Link to='/' className='btn btn-primary'>Back to Recipes</Link>

      {/* Recipe details */}
      <RecipeDetails recipe={recipe} />

      {/* Recipe join */}
      <section>
          {isParticipant ? (
            <button onClick={handleRemoveFromRecipe} className="btn btn-warning">
              Remove from Recipe
            </button>
          ) : (
            <button onClick={handleJoinRecipe} className="btn btn-success">
              Sign Up for Recipe
            </button>
          )}
      </section>

      {/* Ratings summary */}
      <section className="mt-3">
        <h3>
          Average Rating: {averageRating.toFixed(1)} ({totalRatings})
        </h3>
      </section>

      {/* User's comment and rating */}
      <section className='mt-3'>
        <h3>Your Comment and Rating</h3>
        <textarea
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          className="form-control"
          placeholder="Leave a comment..."
        ></textarea>
        <input
          type="number"
          value={userRating}
          onChange={(e) => setUserRating(Number(e.target.value))}
          className="form-control mt-2"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
        />
        <button className="btn btn-primary mt-2" onClick={handleEditComment}>
          Submit
        </button>
      </section>

      {/* Comments section */}
      <section className='mt-3'>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="list-group">
            {comments.map((c) => (
              <li key={c.user.id} className="list-group-item">
                <strong>{c.user.name}</strong>: {c.comment || "No comment"}
                {c.rating && <span> ({c.rating}/5)</span>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default FoodieRecipeDetail;