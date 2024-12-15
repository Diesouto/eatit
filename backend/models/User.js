const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  role: { type: String, required: true, enum: ["foodie", "cocinero"] },
  defaultAddress: { type: mongoose.Schema.Types.ObjectId, ref: "address" },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
