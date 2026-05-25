// src/components/NavbarDashboard.jsx
import "../styles/navbarassessment.css";
import { FiSave } from "react-icons/fi";
import Logo from "../assets/S.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <nav className="db-navbar-fixed">
      <div className="db-main-wrapper">
        {/* LOGO */}
        <div className="db-brand-area">
          <img src={Logo} alt="StepUp Logo" className="db-logo-image" />
        </div>

        {/* MENU */}
        <div className="db-nav-links">
          <button
            className={`db-link-item ${
              isActiveRoute("/assessment") ? "active" : ""
            }`}
            onClick={() => navigate("/assessment")}
          >
            Personal Information
          </button>

          <button
            className={`db-link-item ${
              isActiveRoute("/assessment2") ? "active" : ""
            }`}
            onClick={() => navigate("/assessment2")}
          >
            Skills
          </button>

          <button
            className={`db-link-item ${
              isActiveRoute("/assessment3") ? "active" : ""
            }`}
            onClick={() => navigate("/assessment3")}
          >
            Experience
          </button>
        </div>

        {/* ACTION BUTTON */}
        <div className="db-action-area">
          <button className="db-btn-primary">
            Save Draft
            <FiSave size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
