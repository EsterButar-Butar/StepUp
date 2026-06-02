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
  const hasSummary = Boolean(summary && Object.keys(summary).length > 0);
  const completedAssessments = summary?.completedAssessments ?? 0;
  const highestScore = summary?.highestScore ?? summary?.topScore ?? null;
  const atsScore = summary?.atsScore ?? null;
  const averageScore = summary?.averageScore ?? null;

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
      {!hasSummary ? (
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
                  <h4>Completed Assessments</h4>

                  <span className="summary-tag">Primary</span>
                </div>

                <p>{completedAssessments}</p>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon orange">
                <FiBriefcase />
              </div>

              <div className="summary-content">
                <div className="summary-top-row">
                  <h4>Highest Score</h4>
                  <span className="summary-tag">Personal Best</span>
                </div>

                <p>{highestScore !== null ? `${highestScore}%` : "-"}</p>
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-icon green">
                <FiTarget />
              </div>

              <div className="summary-content">
                <div className="summary-top-row">
                  <h4>{averageScore ? "Average Score" : "ATS Score"}</h4>
                  <span className="summary-tag">Overview</span>
                </div>

                <p>
                  {averageScore
                    ? `${averageScore}%`
                    : atsScore !== null
                      ? `${atsScore}%`
                      : "-"}
                </p>
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

                <p>{summary?.personalityType || "Not available"}</p>
              </div>

              <div className="insight-item">
                <div className="insight-label">
                  <FiCheckCircle />
                  Strongest Skill
                </div>

                <p>
                  {summary?.strength ||
                    summary?.strongestSkill ||
                    "Not available"}
                </p>
              </div>

              <div className="insight-item">
                <div className="insight-label">
                  <FiCheckCircle />
                  Area to Improve
                </div>

                <p>{summary?.improvementArea || "Not available"}</p>
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
