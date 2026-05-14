// src/components/profile/AssessmentSummary.jsx

import {
  FiHeart,
  FiBriefcase,
  FiTarget,
  FiStar,
  FiTrendingUp,
  FiEdit2,
  FiCheckCircle,
} from "react-icons/fi";

import "../../styles/profile/assessment-summary.css";

export default function AssessmentSummary({ summary }) {
  // FALLBACK DATA
  const topInterest = summary?.topInterest || "Technology / Problem Solving";

  const preferredWorkStyle = summary?.preferredWorkStyle || "Remote / Hybrid";

  const careerGoal = summary?.careerGoal || "Frontend Engineer";

  const personalityType = summary?.personalityType || "Creative Problem Solver";

  const strength = summary?.strength || "Fast Learning";

  const improvementArea = summary?.improvementArea || "Public Speaking";

  return (
    <section className="assessment-summary-card">
      {/* HEADER */}
      <div className="section-header">
        <div>
          <h3>Assessment Summary</h3>

          <p>
            Personalized insights generated from your completed assessments.
          </p>
        </div>

        {/* ACTION */}
        <button type="button" className="summary-edit-btn">
          <FiEdit2 />
          Update
        </button>
      </div>

      {/* SUMMARY LIST */}
      <div className="summary-list">
        {/* ITEM */}
        <div className="summary-item">
          <div className="summary-icon purple">
            <FiHeart />
          </div>

          <div className="summary-content">
            <div className="summary-top-row">
              <h4>Top Interest</h4>

              <span className="summary-tag">Primary</span>
            </div>

            <p>{topInterest}</p>
          </div>
        </div>

        {/* ITEM */}
        <div className="summary-item">
          <div className="summary-icon orange">
            <FiBriefcase />
          </div>

          <div className="summary-content">
            <div className="summary-top-row">
              <h4>Preferred Work Style</h4>

              <span className="summary-tag">Work Mode</span>
            </div>

            <p>{preferredWorkStyle}</p>
          </div>
        </div>

        {/* ITEM */}
        <div className="summary-item">
          <div className="summary-icon green">
            <FiTarget />
          </div>

          <div className="summary-content">
            <div className="summary-top-row">
              <h4>Career Goal</h4>

              <span className="summary-tag">Future Role</span>
            </div>

            <p>{careerGoal}</p>
          </div>
        </div>
      </div>

      {/* AI INSIGHT */}
      <div className="ai-insight-card">
        <div className="ai-insight-header">
          <FiTrendingUp />

          <h4>AI Personality Insight</h4>
        </div>

        <div className="ai-insight-content">
          <div className="insight-item">
            <div className="insight-label">
              <FiCheckCircle />
              Personality Type
            </div>

            <p>{personalityType}</p>
          </div>

          <div className="insight-item">
            <div className="insight-label">
              <FiCheckCircle />
              Strongest Skill
            </div>

            <p>{strength}</p>
          </div>

          <div className="insight-item">
            <div className="insight-label">
              <FiCheckCircle />
              Area to Improve
            </div>

            <p>{improvementArea}</p>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="summary-note">
        <FiStar />

        <p>
          These insights are continuously updated based on your assessments,
          profile activities, and AI analysis results.
        </p>
      </div>
    </section>
  );
}
