import "../styles/navbarresult.css";

import Logo from "../assets/S.png";

import { useNavigate, useLocation } from "react-router-dom";
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

  // Refresh user from localStorage when location changes or storage events fire
  useEffect(() => {
    const refresh = () => {
      const stored = safeParse(localStorage.getItem("user")) || {};
      setUser(Object.keys(stored).length ? stored : propUser || {});
    };

    refresh();

    const onStorage = (e) => {
      if (e.key === "user") refresh();
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [location.pathname, propUser]);

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
          <button
            className={`result-link-item ${
              location.pathname.includes("/result") ? "active" : ""
            }`}
            onClick={() => navigate("/result")}
          >
            Result
          </button>

          {/* DETAIL */}
          <button
            className={`result-link-item ${
              location.pathname.includes("/detail-result") ? "active" : ""
            }`}
            onClick={() => navigate(`/detail-result/${selectedCareerId}`)}
          >
            Detail Result
          </button>

          {/* CV */}
          <button
            className={`result-link-item ${
              location.pathname.includes("/cvresult") ? "active" : ""
            }`}
            onClick={() => navigate("/cvresult")}
          >
            CV Result
          </button>

          {/* PROFILE */}
          <button
            className={`result-link-item ${
              location.pathname.includes("/profile") ? "active" : ""
            }`}
            onClick={() => navigate("/profile")}
          >
            History & Profile
          </button>
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
