import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="flex justify-center gap-6 text-sm py-4 text-gray-600 border-b">
      <NavLink
        to="/generate"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-400"
        }
      >
        Generate
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-400"
        }
      >
        Chat
      </NavLink>
      <NavLink
        to="/vision"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-400"
        }
      >
        Vision Board
      </NavLink>

      {user ? (
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
        >
          Sign Out
        </button>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-400"
            }
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-600 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Get Started
          </NavLink>
        </>
      )}
    </nav>
  );
}
