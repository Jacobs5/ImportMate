import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/generate");
    } catch (err) {
      console.error("Login error:", err.code, err.message);

      if (err.code === "auth/quota-exceeded") {
        setError(
          "Login temporarily unavailable — too many login attempts. Try again later."
        );
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with that email.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/generate");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Sign In to ImportMate
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-2 mb-4 rounded border border-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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
          Sign In
        </button>
      </form>

      <div className="my-4 text-center text-gray-500 text-sm">or</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
}
