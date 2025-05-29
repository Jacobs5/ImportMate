import React, { useState } from 'react';
import '../styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email); // set user context
    navigate('/account'); // redirect after login
  };

  return (
    <div className="container max-w-md mx-auto text-left">
      <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>

      <form onSubmit={handleLogin} className="space-y-4">
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

        <button type="submit" className="btn w-full mt-2">Login</button>
      </form>

      <p className="text-sm text-gray-400 mt-4">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-brand-blue hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
