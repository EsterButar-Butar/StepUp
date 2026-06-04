// src/components/landingpage/Hero.jsx

import "../../styles/landingpage/hero.css";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <div id="hero" className="hero">
      {/* BACKGROUND */}
      <div className="hero-bg">
        <div className="blur" />
        <div className="gradient" />
      </div>

      <div className="hero-container">
        {/* LABEL */}
        <div className="badge">
          <span className="badge-dot"></span>
          AI-Powered Career Guidance
        </div>

        {/* TITLE */}
        <h1 className="hero-title">
          Discover your perfect <br />
          career path with AI <br />
          precision
        </h1>

        {/* DESC */}
        <p className="hero-desc">
          Stop guessing about your future. StepUp analyzes your skills,
          interests, and experience to match you with career paths where you’ll
          thrive.
        </p>
      </div>
    </div>
  );
}
