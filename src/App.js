import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Chat from "./pages/Chat";
import Vision from "./pages/Vision";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fefefe] text-gray-900 font-sans">
        <NavBar />
        <main className="max-w-2xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/vision"
              element={
                <ProtectedRoute>
                  <Vision />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
