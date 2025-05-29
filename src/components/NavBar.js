import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Generate', path: '/generate' },
    { name: 'Chat', path: '/chat' },
    { name: 'Vision Board', path: '/vision' },
    { name: 'Upgrade', path: '/upgrade' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold text-brand-blue">
          ImportMate<span className="text-brand-orange">.</span>
        </h1>

        <div className="flex space-x-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'text-brand-orange'
                  : 'text-white hover:text-brand-orange'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link to="/account" className="text-sm text-white hover:text-brand-orange">
                Account
              </Link>
              <button onClick={logout} className="btn-secondary text-sm px-3 py-1">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm px-3 py-1">
                Log in
              </Link>
              <Link to="/signup" className="btn text-sm px-3 py-1">
                Try It Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
