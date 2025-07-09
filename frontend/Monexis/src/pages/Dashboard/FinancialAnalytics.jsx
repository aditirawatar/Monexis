import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import MonthlyComparison from "./MonthlyComparision";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import toast from "react-hot-toast";

export default function FinancialAnalytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Example monthly data (replace with actual data later)
  const monthlyData = [
    { month: "Jan", income: 30000, expenses: 20000 },
    { month: "Feb", income: 35000, expenses: 25000 },
    { month: "Mar", income: 40000, expenses: 30000 },
    { month: "Apr", income: 45000, expenses: 32000 },
    { month: "May", income: 50000, expenses: 40000 },
    { month: "Jun", income: 55000, expenses: 42000 },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        toast.error("No email found in localStorage");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${email}`);
        const data = res.data.user;

        data.income = Number(data.income);
        data.expenses = Number(data.expenses);
        data.savingsGoal = Number(data.savingsGoal);

        setProfile(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, []);

  const calculateSavings = () => {
    if (!profile) return 0;
    return profile.income - profile.expenses;
  };

  const calculateProgress = () => {
    const savings = calculateSavings();
    if (!profile || profile.savingsGoal === 0) return 0;
    return Math.min((savings / profile.savingsGoal) * 100, 100);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <button onClick={toggleSidebar} className="md:hidden text-gray-700">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Financial Analytics</h1>
          <button
            className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
            onClick={() => {
              localStorage.removeItem("userEmail");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </header>

        <main className="p-6 space-y-6">
          {/* Section 3: Income vs Expenses Trend */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-700 font-bold mb-4">Income vs Expenses Trend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 4: Savings Progress */}
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Savings Progress</h2>
            <p className="text-gray-600 mb-2">
              You’ve saved ₹{calculateSavings().toLocaleString()} out of ₹
              {profile ? profile.savingsGoal.toLocaleString() : "Loading..."}
            </p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-green-500 h-4 rounded transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <p className="text-right mt-1 text-gray-600">
              {Math.floor(calculateProgress())}% of your goal
            </p>
          </div>
        </main>
          <MonthlyComparison />
      </div>
    </div>
  );
}
