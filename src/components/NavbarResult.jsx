import "../styles/navbarresult.css";

import Logo from "../assets/S.png";

import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarResult({ user = {}, selectedCareerId }) {
  const navigate = useNavigate();

  const location = useLocation();

  const avatarSeed = user?.fullName || "Guest";

  const profileImage =
    user?.profileImage ||
    `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
      avatarSeed,
    )}`;

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
            alt="Profile"
            className="result-profile-image"
          />

          <div className="result-profile-info">
            <h4>{user?.fullName || "-"}</h4>

            <p>{user?.major || "-"}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
