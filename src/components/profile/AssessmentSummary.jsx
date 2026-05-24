import {
  FiHeart,
  FiBriefcase,
  FiTarget,
  FiStar,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

import "../../styles/profile/assessment-summary.css";

export default function AssessmentSummary({ summary = {} }) {
  return (
    <section className="assessment-summary-card">
      {/* HEADER */}
      <div className="section-header">
        <div>
          <h3>Assessment Summary</h3>

          <p>Personalized insights generated from your assessments.</p>
        </div>
      </div>

      {/* EMPTY */}
      {!summary ? (
        <div className="summary-empty-state">
          <p>No assessment summary available.</p>
        </div>
      ) : (
        <>
          {/* SUMMARY LIST */}
          <div className="summary-list">
            <div className="summary-item">
              <div className="summary-icon purple">
                <FiHeart />
              </div>

              <div className="summary-content">
                <div className="summary-top-row">
                  <h4>Top Interest</h4>

                  <span className="summary-tag">Primary</span>
                </div>

                <p>{summary?.topInterest}</p>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon orange">
                <FiBriefcase />
              </div>

              <div className="summary-content">
                <div className="summary-top-row">
                  <h4>Preferred Work Style</h4>

                  <span className="summary-tag">Work Mode</span>
                </div>

                <p>{summary?.preferredWorkStyle}</p>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon green">
                <FiTarget />
              </div>

              <div className="summary-content">
                <div className="summary-top-row">
                  <h4>Career Goal</h4>

                  <span className="summary-tag">Future Role</span>
                </div>

                <p>{summary?.careerGoal}</p>
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

                <p>{summary?.personalityType}</p>
              </div>

              <div className="insight-item">
                <div className="insight-label">
                  <FiCheckCircle />
                  Strongest Skill
                </div>

                <p>{summary?.strength}</p>
              </div>

              <div className="insight-item">
                <div className="insight-label">
                  <FiCheckCircle />
                  Area to Improve
                </div>

                <p>{summary?.improvementArea}</p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="summary-note">
            <FiStar />

            <p>
              These insights are updated based on your assessments and AI
              analysis results.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
