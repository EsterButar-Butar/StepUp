// src/components/landingpage/Illustration.jsx
import "../../styles/landingpage/illustration.css";
import container from "../../assets/container.png";
import { FiArrowRight } from "react-icons/fi";

export default function Illustration() {
  return (
    <section className="cta-section">
      <div className="cta-wrapper">
        <div className="cta-card">
          {/* DECOR */}
          <div className="cta-bg-decor" />
          <div className="cta-overlay-blur" />

          {/* CONTENT LEFT */}
          <div className="cta-content">
            <h2 className="cta-heading">Ready to find your direction?</h2>
            <p className="cta-description">
              Join thousands of students who have found clarity and confidence
              in their career choices with StepUp.
            </p>
            <button className="cta-button">
              <span>Your Journey Starts Here</span>
            </button>
          </div>

          {/* IMAGE RIGHT */}
          <div className="cta-image-container">
            <img className="cta-img" alt="illustration" src={container} />
          </div>
        </div>
      </div>
    </section>
  );
}
