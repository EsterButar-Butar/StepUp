// src/components/Footer.jsx
import "../styles/footer.css";
import Logo from "../assets/S.png";

export default function Footer() {
  return (
    <footer className="ft-main">
      <div className="ft-container">
        <div className="ft-grid">
          {/* BRAND COLUMN ONLY */}
          <div className="ft-brand-col">
            <div className="ft-logo-wrapper">
              <img src={Logo} alt="StepUp Logo" className="ft-logo-img" />
            </div>
            <p className="ft-brand-desc">
              Empowering students to find their true calling through AI-driven
              career path analysis.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
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
