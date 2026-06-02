import "../../styles/landingpage/illustration.css";
import {
  FiArrowRight,
  FiCode,
  FiPenTool,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

export default function Illustration() {
  return (
    <section className="cta-section">
      <div className="cta-wrapper">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-heading">Ready to find your direction?</h2>
            <p className="cta-description">
              Join thousands of students who have found clarity and confidence
              in their career choices with StepUp.
            </p>
          </div>

          <div className="cta-visual" aria-hidden="true">
            <div className="visual-container">
              <div className="center-card">
                <div className="center-icon-wrapper">
                  <FiAward className="center-academic-icon" />
                </div>
              </div>

              <div className="floating-card fl-purple">
                <FiCode />
              </div>

              <div className="floating-card fl-orange">
                <FiPenTool />
              </div>

              <div className="floating-card fl-green">
                <FiTrendingUp />
              </div>

              <svg
                className="vector-lines"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="200"
                  y1="200"
                  x2="310"
                  y2="100"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="200"
                  y1="200"
                  x2="90"
                  y2="160"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="200"
                  y1="200"
                  x2="140"
                  y2="310"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
