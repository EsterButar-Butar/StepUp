// src/components/NavbarDashboard.jsx
import "../styles/navbarassessment.css";
import { FiSave } from "react-icons/fi";
import Logo from "../assets/S.png";
import { useNavigate } from "react-router-dom";

export default function NavbarDashboard() {
  const navigate = useNavigate();

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
            className="db-link-item"
            onClick={() => navigate("/Assessment")}
          >
            Personal Information
          </button>

          <button
            className="db-link-item"
            onClick={() => navigate("/Assessment2")}
          >
            Skills
          </button>

          <button
            className="db-link-item"
            onClick={() => navigate("/Assessment3")}
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
