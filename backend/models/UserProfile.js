const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  income: Number,
  expenses: Number,
  investments: Number,
  savingsGoal: Number,
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
