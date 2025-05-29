import React from 'react';
import { useAuth } from '../context/AuthContext';

function Account() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-white mb-4">My Account</h1>
      <p className="text-gray-300 mb-2">Email: {user?.email}</p>
      <p className="text-gray-400 text-sm">You’re currently on the Free plan.</p>
      <p className="mt-4">
        <a href="/upgrade" className="btn">
          Upgrade to Premium
        </a>
      </p>
    </div>
  );
}

export default Account;
