// models/Recipe.js
const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  comment: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  hasPaid: { type: Boolean, default: false },
});

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  creationDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date, required: true },
  unitsAvailable: { type: Number, required: true },
  slots: { type: Number, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: function () {
      return this.deliveryDate > new Date() ? "active" : "inactive";
    },
  },
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  participants: [ParticipantSchema],
});

module.exports = mongoose.model("recipe", RecipeSchema);
