// src/components/NavbarResult.jsx

import "../styles/navbarresult.css";
import Logo from "../assets/S.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavbarResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=2563eb&color=fff`;

  const [user, setUser] = useState({
    fullName: "Guest User",
    major: "No Major",
    profileImage: defaultAvatar("Guest User"),
  });

  useEffect(() => {
    const assessmentData = JSON.parse(localStorage.getItem("assessmentStep1"));

    const profileImage = localStorage.getItem("assessmentProfileImage");

    if (assessmentData) {
      setUser({
        fullName: assessmentData.fullName || "Guest User",

        major: assessmentData.major || "No Major",

        profileImage:
          profileImage ||
          defaultAvatar(assessmentData.fullName || "Guest User"),
      });
    }
  }, []);

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
          <button
            className={`result-link-item ${
              location.pathname === "/result" ? "active" : ""
            }`}
            onClick={() => navigate("/result")}
          >
            Result
          </button>

          <button
            className={`result-link-item ${
              location.pathname === "/detail-result" ? "active" : ""
            }`}
            onClick={() => navigate("/detail-result")}
          >
            Detail Result
          </button>

          <button
            className={`result-link-item ${
              location.pathname === "/cvresult" ? "active" : ""
            }`}
            onClick={() => navigate("/cvresult")}
          >
            CV Result
          </button>

          <button
            className={`result-link-item ${
              location.pathname === "/profile" ? "active" : ""
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
            src={user.profileImage}
            alt="Profile"
            className="result-profile-image"
          />

          <div className="result-profile-info">
            <h4>{user.fullName}</h4>
            <p>{user.major}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
