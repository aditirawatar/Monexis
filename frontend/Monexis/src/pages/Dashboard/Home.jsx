import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="font-semibold text-xl">Monexis</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to Monexis</h1>
          <p className="mb-6">
            Simplify your finances with powerful tools for tracking, predicting, and managing stocks.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-gray-800 px-6 py-2 rounded shadow hover:bg-gray-200 transition"
          >
            Get Started
          </button>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="bg-gray-800 text-white rounded-lg p-4 shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold mb-2">Documentation</h2>
            <p className="text-sm">Comprehensive guides to help you integrate and use Monexis effectively.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg p-4 shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold mb-2">Transactions</h2>
            <p className="text-sm">Track your transactions seamlessly and securely.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg p-4 shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold mb-2">Stock Prediction</h2>
            <p className="text-sm">Leverage AI to forecast market trends and make smart investments.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t bg-white">
        &copy; {new Date().getFullYear()} Monexis. All rights reserved.
      </footer>
    </div>
  );
}
