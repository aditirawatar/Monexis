import React from "react";
import {
  FaMoneyCheckAlt,
  FaChartPie,
  FaChartLine,
  FaHome,
  FaPiggyBank,
  FaChartBar,
  FaBook
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
      <nav className="space-y-2">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center w-full px-4 py-2 rounded transition ${
            isActive("/dashboard") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <FaHome className="mr-3" /> Dashboard
        </button>

        <button
          onClick={() => navigate("/transaction")}
          className={`flex items-center w-full px-4 py-2 rounded transition ${
            isActive("/transaction") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <FaMoneyCheckAlt className="mr-3" /> Transactions
        </button>

        <button
          onClick={() => navigate("/investment")}
          className={`flex items-center w-full px-4 py-2 rounded transition ${
            isActive("/investment") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <FaPiggyBank className="mr-3" /> Investment Tracker
        </button>

        <button
          onClick={() => navigate("/FinancialAnalytics")}
          className={`flex items-center w-full px-4 py-2 rounded transition ${
            isActive("/FinancialAnalytics") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <FaChartBar className="mr-3" /> Analytics
        </button>

      </nav>
    </aside>
  );
}
