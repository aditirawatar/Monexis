const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// Save or update profile
router.post("/", async (req, res) => {
  const { email, income, expenses, investments, savingsGoal } = req.body;

  try {
    let user = await UserProfile.findOne({ email });

    if (user) {
      user.income = income;
      user.expenses = expenses;
      user.investments = investments;
      user.savingsGoal = savingsGoal;
      await user.save();
    } else {
      user = new UserProfile({ email, income, expenses, investments, savingsGoal });
      await user.save();
    }

    res.status(200).json({ message: "Profile saved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error saving profile", error });
  }
});

// Get profile by email
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await UserProfile.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

module.exports = router;
