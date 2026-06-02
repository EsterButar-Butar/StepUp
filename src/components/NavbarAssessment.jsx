// src/components/NavbarDashboard.jsx
import { useEffect, useState } from "react";
import "../styles/navbarassessment.css";
import { FiSave } from "react-icons/fi";
import Logo from "../assets/S.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarDashboard({ onSaveDraft }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

  const isActiveRoute = (path) => location.pathname === path;

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => setToastMessage(null), 2500);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleSaveDraft = () => {
    if (!onSaveDraft) return;

    try {
      onSaveDraft();
      showToast("Draft saved successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to save draft", "error");
    }
  };

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
          <button
            type="button"
            className="db-btn-primary"
            onClick={handleSaveDraft}
          >
            Save Draft
            <FiSave size={18} />
          </button>
        </div>
      </div>

      {toastMessage ? (
        <div className={`draft-toast ${toastType}`}>{toastMessage}</div>
      ) : null}
    </nav>
  );
}
