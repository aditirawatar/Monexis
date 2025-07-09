import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  income: Number,
  expenses: Number,
  investments: Number,
  savingsGoal: Number,
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
