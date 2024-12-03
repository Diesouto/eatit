// routes/api/recipes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Recipe model
const Recipe = require('../../models/Recipe');

// @route   GET api/recipes/
// @desc    Get all recipes/All recipes from cook user
// @access  Public
router.get('/', async (req, res) => {
  const { recipeStatus, chefId } = req.query;
  const filters = {};

  if (recipeStatus) filters.recipeStatus = recipeStatus;
  if (chefId) filters.chefId = new mongoose.Types.ObjectId(chefId);

  try {
    const recipes = await Recipe.find(filters);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST api/recipes/
// @desc    Add/save recipe
// @access  Public
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT api/recipes/:id
// @desc    Update recipe by id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete recipe by id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Receta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Anotarse a una Receta
router.post('/:id/participate', async (req, res) => {
  try {
    const { userId, comment, rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    recipe.participants.push({ userId, comment, rating });
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
