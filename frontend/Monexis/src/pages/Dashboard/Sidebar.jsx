import React from "react";
import { FaMoneyCheckAlt, FaFileAlt, FaChartPie, FaChartLine } from "react-icons/fa";
import { FaHome, FaPiggyBank, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SideContent({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
    >
         <button
        onClick={() => navigate("/")}
        className="w-full text-left text-3xl px-4 rounded hover:bg-gray-700 transition"
      >
        🏠 Monexis
      </button>
      <button onClick={toggleSidebar} className="md:hidden text-right w-full text-gray-300 mb-4">
        ✖
      </button>
      <nav className="space-y-4">
       <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaHome className="mr-3" /> Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaPiggyBank className="mr-3" /> Investment Tracker
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaChartBar className="mr-3" /> Financial Analytics
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaMoneyCheckAlt className="mr-3" /> Transactions
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaFileAlt className="mr-3" /> Documentation
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaChartPie className="mr-3" /> Budgeting
        </a>
        <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <FaChartLine className="mr-3" /> Stock Market
        </a>
      </nav>
    </aside>
  );
}
