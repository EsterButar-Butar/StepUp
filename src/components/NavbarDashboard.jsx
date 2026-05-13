// src/components/NavbarDashboard.jsx
import "../styles/navbardashboard.css";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../assets/S.png";

export default function NavbarDashboard() {
  return (
    <nav className="db-navbar-fixed">
      <div className="db-main-wrapper">
        {/* LOGO AREA */}
        <div className="db-brand-area">
          <img src={Logo} alt="StepUp Logo" className="db-logo-image" />
        </div>

        {/* MENU TENGAH - Hanya Tulisan */}
        <div className="db-nav-links">
          <a href="/landing" className="db-link-item">
            Home
          </a>
          <a href="#how-it-works" className="db-link-item">
            How it Works
          </a>
          <a href="#benefit" className="db-link-item">
            Benefit
          </a>
        </div>

        <div className="db-action-area">
          <button
            className="db-btn-primary"
            onClick={() => (window.location.href = "/landing")}
          >
            Dashboard
            <FiArrowLeft size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
