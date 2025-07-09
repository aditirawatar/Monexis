import React, { useState } from "react";
import Sidebar from "../pages/Dashboard/Sidebar";
import { FaBars } from "react-icons/fa";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <button onClick={toggleSidebar} className="md:hidden text-gray-700">
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Monexis</h1>
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

        {/* Page content */}
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
