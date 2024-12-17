const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
    required: true,
  },
  hasPaid: { type: Boolean, default: false },
});

module.exports = mongoose.model("subscription", SubscriptionSchema);
