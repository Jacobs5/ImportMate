import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/generate");
    } catch (err) {
      console.error("Signup error:", err.code, err.message);

      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/generate");
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Your ImportMate Account
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-2 mb-4 rounded border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
        >
          Sign Up
        </button>
      </form>

      <div className="my-4 text-center text-gray-500 text-sm">or</div>

      <button
        onClick={handleGoogleSignup}
        className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
}
