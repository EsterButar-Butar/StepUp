import "../styles/navbarresult.css";

import Logo from "../assets/S.png";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

function safeParse(item) {
  try {
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
}

export default function NavbarResult({
  user: propUser = {},
  selectedCareerId,
}) {
  const navigate = useNavigate();

  const location = useLocation();

  const [user, setUser] = useState(() => {
    const stored = safeParse(localStorage.getItem("user")) || {};
    return Object.keys(stored).length ? stored : propUser || {};
  });

  useEffect(() => {
    const refresh = () => {
      const stored = safeParse(localStorage.getItem("user"));
      if (stored && Object.keys(stored).length) {
        setUser(stored);
      } else if (propUser && Object.keys(propUser).length) {
        setUser(propUser);
      }
    };

    refresh();

    const onStorage = (e) => {
      if (e.key === "user") refresh();
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [location.pathname]); // Removed propUser to prevent infinite loop

  const displayName =
    user?.fullName ||
    user?.name ||
    propUser?.fullName ||
    propUser?.name ||
    "User";
  const subtitle =
    user?.major ||
    user?.role ||
    user?.email ||
    propUser?.major ||
    propUser?.role ||
    propUser?.email ||
    "StepUp User";

  const avatarSource =
    user?.profilePicture ||
    user?.profileImage ||
    user?.avatar ||
    propUser?.profilePicture ||
    propUser?.profileImage ||
    propUser?.avatar ||
    null;

  const avatarSeed = displayName || "Guest";

  const profileImage =
    avatarSource ||
    `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(avatarSeed)}`;

  return (
    <nav className="result-navbar-fixed">
      <div className="result-main-wrapper">
        {/* LOGO */}
        <div className="result-brand-area" onClick={() => navigate("/landing")}>
          <img src={Logo} alt="StepUp Logo" className="result-logo-image" />

          <span className="result-logo-text">StepUp</span>
        </div>

        {/* MENU */}
        <div className="result-nav-links">
          {/* RESULT */}
          <NavLink
            to="/result"
            end
            className={({ isActive }) =>
              `result-link-item ${isActive ? "active" : ""}`
            }
          >
            Result
          </NavLink>

          {/* DETAIL */}
          <button
            type="button"
            className={`result-link-item ${
              location.pathname.includes("/detail-result") ? "active" : ""
            }`}
            onClick={() => {
              if (!selectedCareerId) return;
              navigate(`/detail-result/${selectedCareerId}`);
            }}
            disabled={!selectedCareerId}
          >
            Detail Result
          </button>

          {/* CV */}
          <NavLink
            to="/cvresult"
            className={({ isActive }) =>
              `result-link-item ${isActive ? "active" : ""}`
            }
          >
            CV Result
          </NavLink>

          {/* PROFILE */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `result-link-item ${isActive ? "active" : ""}`
            }
          >
            History & Profile
          </NavLink>
        </div>

        {/* PROFILE */}
        <div
          className="result-profile-area"
          onClick={() => navigate("/profile")}
        >
          <img
            src={profileImage}
            alt={displayName}
            className="result-profile-image"
          />

          <div className="result-profile-info">
            <h4>{displayName}</h4>

            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
