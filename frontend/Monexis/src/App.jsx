import React from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dasboard";
import ProfileSetup from "./pages/Dashboard/ProfileSetup";
import { Toaster } from "react-hot-toast";
import Investment from "./pages/Dashboard/Investment";
import Transaction from "./pages/Dashboard/Transaction";
import FinancialAnalytics from "./pages/Dashboard/FinancialAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ProfileSetup" element={<ProfileSetup />} />
        <Route path="/investment" element={<Investment/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/FinancialAnalytics" element={<FinancialAnalytics/>}/>
        <Route path="*" element={<Navigate to="/dashboard"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
