// src/components/Navbar.jsx
import "../styles/navbar.css";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../assets/S.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="nv-navbar-fixed">
      <div className="nv-main-wrapper">
        <div className="nv-brand-area">
          <img src={Logo} alt="StepUp Logo" className="nv-logo-image" />
        </div>
        {/* MENU */}
        <div className="nv-nav-links">
          <a href="#home" className="nv-link-item">
            Home
          </a>

          <a href="#how-it-works" className="nv-link-item">
            How it Works
          </a>

          <a href="#features" className="nv-link-item">
            Features
          </a>
        </div>
        {/* CTA */}
        <div className="nv-action-area">
          <span className="nv-signin-text" onClick={() => navigate("/login")}>
            Sign In
          </span>
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
