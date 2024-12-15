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

    const existingSubscription = await Subscription.findOne({
      userId,
      recipeId,
    });

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

// Remove user subscription
router.delete("/:id/remove", async (req, res) => {
  const { userId } = req.body;
  const recipeId = req.params.id;

  try {
    const result = await Subscription.deleteOne({ userId, recipeId });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "User removed from recipe" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if user is subscribed
router.get("/:id/is-subscribed", async (req, res) => {
  const { userId } = req.query;
  const recipeId = req.params.id;

  try {
    const subscription = await Subscription.findOne({ userId, recipeId });

    res.json({ isSubscribed: !!subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get subscribed users to recipe
router.get("/api/subscriptions/:recipeId/participants", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const participants = await Subscription.find({ recipeId }).populate(
      "userId",
      "name"
    );
    const users = participants.map((p) => ({
      _id: p.userId._id,
      name: p.userId.name,
    }));
    res.json(users);
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ message: "Error fetching participants" });
  }
});

module.exports = router;
