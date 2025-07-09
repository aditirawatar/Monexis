import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-2xl">Monexis- <span className="font-light text-xl">Finance Tracker</span></span>
        </div>

        <div className="flex items-center gap-4">
          {email ? (
            <>
              <img
                src="https://avatars.githubusercontent.com/u/9919?v=4" 
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                onClick={() => navigate("/profile")}
              />
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}
        </div>
      </header>

    
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to Monexis</h1>
          <p className="mb-6">
            Simplify your finances with powerful tools for tracking, predicting, and managing stocks.
          </p>
          {email ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-gray-800 px-6 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-gray-800 px-6 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              Get Started
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="bg-gray-800 text-white rounded-lg p-4 shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold mb-2">Investment Tracker</h2>
            <p className="text-sm">It allows you to track different assets like stocks, mutual funds, crypto, gold, or any other investments you might have. </p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg p-4 shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold mb-2">Transactions</h2>
            <p className="text-sm">Track your transactions seamlessly and securely.</p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg p-4 shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold mb-2">Analytics</h2>
            <p className="text-sm">The Financial Analytics section acts as your personal finance dashboard, turning raw numbers into meaningful insights.</p>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 border-t bg-white">
        &copy; {new Date().getFullYear()} Monexis. All rights reserved.
      </footer>
    </div>
  );
}
