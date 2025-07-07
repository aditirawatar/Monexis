import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <button onClick={toggleSidebar} className="md:hidden text-gray-700">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100 transition">Logout</button>
        </header>

        {/* Boxes */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-600 font-medium mb-2">Total Income</h2>
            <p className="text-2xl font-bold text-green-600">₹ 80,000</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-600 font-medium mb-2">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-500">₹ 45,000</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-600 font-medium mb-2">Balance</h2>
            <p className="text-2xl font-bold text-blue-600">₹ 35,000</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-gray-600 font-medium mb-2">Recent Activity</h2>
            <p className="text-sm text-gray-500">3 new transactions today</p>
          </div>
        </main>
      </div>
    </div>
  );
}
