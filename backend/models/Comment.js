const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "recipe", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
});

module.exports = mongoose.model("comment", CommentSchema);
