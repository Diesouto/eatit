const express = require("express");
const router = express.Router();
const Comment = require("../../models/Comment");
const Recipe = require("../../models/Recipe");

// Get all comments for a recipe
router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.id }).populate(
      "userId",
      "name email"
    );

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get average rating for a recipe
router.get("/:id/average-rating", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const comments = await Comment.find({ recipeId });

    if (comments.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
    const averageRating = totalRating / comments.length;

    res.json({ averageRating: averageRating.toFixed(1) }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add/Update a comment and/or rating
router.post("/:id", async (req, res) => {
  const { userId, rating, comment } = req.body;
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Check if the user has already commented on this recipe
    const existingComment = await Comment.findOne({ userId, recipeId });
    
    if (existingComment) {
      // If comment exists, update it
      existingComment.rating = rating;
      existingComment.comment = comment;
      await existingComment.save();
      return res.status(200).json({ message: "Comment updated successfully", existingComment });
    } else {
      // If no comment exists, create a new one
      const newComment = new Comment({
        userId,
        recipeId,
        rating,
        comment,
      });
      await newComment.save();
      return res.status(201).json({ message: "Comment added successfully", newComment });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
