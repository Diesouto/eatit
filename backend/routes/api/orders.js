const express = require("express");
const router = express.Router();
const Subscription = require("../../models/Subscription");
const Recipe = require("../../models/Recipe");

// Join a recipe
router.post("/:id/join", async (req, res) => {
  const { userId } = req.body;
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingSubscription = await Subscription.findOne({ userId, recipeId });

    if (existingSubscription) {
      return res.status(400).json({ message: "User is already subscribed" });
    }

    const subscription = new Subscription({ userId, recipeId });
    await subscription.save();

    res.status(200).json({ message: "User successfully subscribed to recipe" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
