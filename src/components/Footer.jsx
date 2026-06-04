// src/components/Footer.jsx

import "../styles/footer.css";
import Logo from "../assets/S.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const latestCareerId = localStorage.getItem("selectedCareerId");

  return (
    <footer className="ft-main">
      <div className="ft-container">
        <div className="ft-grid">
          {/* BRAND */}
          <div className="ft-brand-col">
            <div className="ft-logo-wrapper">
              <img src={Logo} alt="StepUp Logo" className="ft-logo-img" />

              <h2 className="ft-logo-text">StepUp</h2>
            </div>

            <p className="ft-brand-desc">
              Empowering students to find their true calling through AI-driven
              career path analysis.
            </p>
          </div>

          {/* LANDING NAVBAR */}
          <div className="ft-links-col">
            <h3>Explore</h3>

            <button onClick={() => navigate("/landing?section=hero")}>
              Home
            </button>

            <button onClick={() => navigate("/landing?section=how")}>
              How it Works
            </button>

            <button onClick={() => navigate("/landing?section=features")}>
              Features
            </button>
          </div>

          {/* ASSESSMENT NAVBAR */}
          <div className="ft-links-col">
            <h3>Assessment</h3>

            <button onClick={() => navigate("/assessment")}>
              Personal Information
            </button>

            <button onClick={() => navigate("/assessment2")}>Skills</button>

            <button onClick={() => navigate("/assessment3")}>Experience</button>
          </div>

          {/* RESULT NAVBAR */}
          <div className="ft-links-col">
            <h3>Results</h3>

            <button onClick={() => navigate("/result")}>Result</button>

            <button
              onClick={() =>
                latestCareerId && navigate(`/detail-result/${latestCareerId}`)
              }
            >
              Detail Result
            </button>

            <button onClick={() => navigate("/cvresult")}>CV Result</button>

            <button onClick={() => navigate("/profile")}>
              History & Profile
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="ft-bottom">
          <p className="ft-copy">
            © 2026 StepUp Career Platform. All rights reserved.
          </p>

          <div className="ft-credit">Designed for students ❤️</div>
        </div>
      </div>
    </footer>
  );
}
