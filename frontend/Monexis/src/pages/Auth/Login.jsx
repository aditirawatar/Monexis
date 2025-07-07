import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center px-4">
      {/* Top Home button */}
      <div className="w-full flex justify-start mt-4">
        <button
          onClick={() => navigate("/")}
          className="ml-4 px-4 py-1 border text-white border-gray-300 rounded hover:bg-gray-700 transition"
        >
          Home
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center mt-4">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Login to Monexis 🚀</h1>
        <p className="text-gray-500 mb-6">Manage your finances easily</p>

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-4 text-left">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Login with Email
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-gray-500 text-sm">
            <span className="bg-white px-2">OR</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3c-1.5 4.2-5.5 7-10.3 7a11 11 0 1 1 0-22c2.8 0 5.3 1 7.3 2.7l5.9-5.9A19 19 0 0 0 24 5a19 19 0 1 0 0 38c9.6 0 17.7-7 18.9-16.5c.1-.8.1-1.7.1-2.5c0-1.1-.1-2.1-.3-3z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8A11 11 0 0 1 24 13c2.8 0 5.3 1 7.3 2.7l5.9-5.9A19 19 0 0 0 24 5a19 19 0 0 0-17.7 9.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 43a19 19 0 0 0 13.5-5.3l-6.3-5.5A11 11 0 0 1 24 37a11 11 0 0 1-10.2-7.3l-6.7 5.1A19 19 0 0 0 24 43z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.5-4.6 6-8.3 6a11 11 0 0 1-10.2-7.3l-6.7 5.1A19 19 0 0 0 24 43c9.6 0 17.7-7 18.9-16.5c.1-.8.1-1.7.1-2.5c0-1.1-.1-2.1-.3-3z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-gray-500 text-sm">
          Don't have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}