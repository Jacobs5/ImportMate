import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Generate from './pages/Generate';
import Chat from './pages/Chat';
import Vision from './pages/Vision';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Upgrade from './pages/Upgrade';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-950 text-white">
          <Navbar />
          <div className="px-4 pt-20 max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/upgrade" element={<Upgrade />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
