import React, { useState } from 'react';
import '../styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // simulate auto-login after signup
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    login(email); // simulate account creation
    navigate('/account'); // redirect to account page
  };

  return (
    <div className="container max-w-md mx-auto text-left">
      <h1 className="text-3xl font-bold text-white mb-6">Create Account</h1>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn w-full mt-2">Sign Up</button>
      </form>

      <p className="text-sm text-gray-400 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-blue hover:underline">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
