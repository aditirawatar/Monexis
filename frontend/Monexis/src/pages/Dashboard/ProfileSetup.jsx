import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "../Auth/firebase";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = auth.currentUser?.email;

    if (!email) {
      toast.error("User email not found. Please login again.");
      return;
    }

    const data = {
      email: email,
      income: e.target.income.value,
      expenses: e.target.expenses.value,
      investments: e.target.investments.value,
      savingsGoal: e.target.savingsGoal.value,
    };

    try {
     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, data);
      toast.success("Profile saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Setup Your Financial Profile 💰
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Monthly Income (₹)</label>
            <input
              type="number"
              name="income"
              placeholder="e.g., 80000"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Monthly Expenses (₹)</label>
            <input
              type="number"
              name="expenses"
              placeholder="e.g., 45000"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Investments (₹)</label>
            <input
              type="number"
              name="investments"
              placeholder="e.g., 10000"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Savings Goal (₹)</label>
            <input
              type="number"
              name="savingsGoal"
              placeholder="e.g., 500000"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Save & Go to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
