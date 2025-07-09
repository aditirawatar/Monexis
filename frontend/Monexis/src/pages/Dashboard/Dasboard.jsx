import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Fetch user profile
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

        setProfile(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile data");
      }
    };

    // Load transactions from localStorage
    const storedTransactions = localStorage.getItem("transactions");
    setTransactions(storedTransactions ? JSON.parse(storedTransactions) : []);

    fetchProfile();
  }, []);

  const calculateBalance = () => {
    if (!profile) return 0;
    return profile.income - profile.expenses;
  };

  const pieData = [
    { name: "Income", value: profile ? profile.income : 0 },
    { name: "Expenses", value: profile ? profile.expenses : 0 },
    { name: "Balance", value: profile ? calculateBalance() : 0 },
  ];

  const COLORS = ["#10B981", "#EF4444", "#3B82F6"];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <button onClick={toggleSidebar} className="md:hidden text-gray-700">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
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

        {/* Summary cards */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition">
            <h2 className="text-gray-600 font-medium mb-2">Total Income</h2>
            <p className="text-2xl font-bold text-green-600">
              ₹ {profile ? profile.income.toLocaleString() : "Loading..."}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition">
            <h2 className="text-gray-600 font-medium mb-2">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-500">
              ₹ {profile ? profile.expenses.toLocaleString() : "Loading..."}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition">
            <h2 className="text-gray-600 font-medium mb-2">Balance</h2>
            <p className="text-2xl font-bold text-blue-600">
              ₹ {profile ? calculateBalance().toLocaleString() : "Loading..."}
            </p>
          </div>
        </main>

        {/* Transactions & Pie chart */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-700 font-bold mb-4">Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions yet.</p>
            ) : (
              <ul className="space-y-3">
                {transactions.slice(0, 5).map((txn, index) => (
                  <li key={index} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{txn.title}</p>
                      <p className="text-gray-500 text-sm">{txn.date}</p>
                    </div>
                    <p
                      className={`font-bold ${
                        txn.type === "Expense" ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      ₹ {txn.amount.toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pie chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-700 font-bold mb-4">Financial Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
