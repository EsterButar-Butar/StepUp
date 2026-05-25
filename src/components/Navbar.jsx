// src/components/Navbar.jsx
import "../styles/navbar.css";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/S.png";

const parseStoredJson = (key) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) return null;

    // Treat literal strings 'null' and 'undefined' as empty
    if (storedValue === "null" || storedValue === "undefined") return null;

    return JSON.parse(storedValue);
  } catch {
    return null;
  }
};

const normalizeStoredUser = (value) => {
  if (!value || typeof value !== "object") {
    return null;
  }

  // Support several possible shapes: { user }, { data: { user } }, or the user object itself
  return value.user || value.data?.user || value;
};

const getStoredAuth = () => {
  const rawToken = localStorage.getItem("token");
  const token =
    rawToken && rawToken !== "null" && rawToken !== "undefined"
      ? rawToken
      : null;

  const user = normalizeStoredUser(parseStoredJson("user"));

  return { token, user };
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const [auth, setAuth] = useState(getStoredAuth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { token, user } = auth || {};

  const isAuthenticated = Boolean(
    (token && token !== "null" && token !== "undefined") ||
    (user && typeof user === "object" && Object.keys(user).length > 0),
  );
  const displayName = user?.name || user?.fullName || "User";
  const profileLabel =
    user?.role || user?.major || user?.email || "StepUp Member";
  const avatarSeed = displayName || user?.email || "Guest";
  const profileImage =
    user?.profilePicture ||
    user?.profileImage ||
    `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
      avatarSeed,
    )}`;

  const isActiveSection = (hash) => {
    if (hash === "#home") {
      return location.hash === "" || location.hash === "#home";
    }

    return location.hash === hash;
  };

  useEffect(() => {
    setAuth(getStoredAuth());
  }, [location.pathname]);

  useEffect(() => {
    const handleAuthChange = () => {
      setAuth(getStoredAuth());
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("focus", handleAuthChange);
    window.addEventListener("auth:changed", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("focus", handleAuthChange);
      window.removeEventListener("auth:changed", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileNavigate = (path) => {
    setIsProfileOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
    setIsProfileOpen(false);
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/login");
  };

  return (
    <nav className="nv-navbar-fixed">
      <div className="nv-main-wrapper">
        <div className="nv-brand-area">
          <img src={Logo} alt="StepUp Logo" className="nv-logo-image" />
        </div>
        {/* MENU */}
        <div className="nv-nav-links">
          <a
            href="#home"
            className={`nv-link-item ${isActiveSection("#home") ? "active" : ""}`}
          >
            Home
          </a>

          <a
            href="#how-it-works"
            className={`nv-link-item ${
              isActiveSection("#how-it-works") ? "active" : ""
            }`}
          >
            How it Works
          </a>

          <a
            href="#features"
            className={`nv-link-item ${
              isActiveSection("#features") ? "active" : ""
            }`}
          >
            Features
          </a>
        </div>
        {/* CTA */}
        <div className="nv-action-area">
          <button
            className="nv-btn-dark"
            onClick={() => navigate("/assessment")}
          >
            Start Analysis
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
