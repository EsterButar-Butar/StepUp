import {
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiBarChart2,
} from "react-icons/fi";

import "../../styles/profile/assessment-progress.css";

export default function AssessmentProgress({ progress = {} }) {
  const percentage = progress?.percentage || 0;

  const progressItems = progress?.items || [];

  return (
    <section className="assessment-progress-card">
      {/* HEADER */}
      <div className="section-header">
        <div>
          <h3>Assessment Progress</h3>

          <p>Track your onboarding and assessment journey.</p>
        </div>

        <div className="progress-status-badge">
          <FiTrendingUp />
          Active Progress
        </div>
      </div>

      {/* TOP */}
      <div className="progress-top-section">
        {/* CIRCLE */}
        <div className="progress-circle-wrapper">
          <div
            className="progress-circle"
            style={{
              background: `conic-gradient(
                #7c3aed ${percentage * 3.6}deg,
                #e5e7eb 0deg
              )`,
            }}
          >
            <div className="progress-circle-inner">
              <span>{percentage}%</span>

              <small>Complete</small>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="progress-mini-stats">
          <div className="mini-stat-card">
            <FiAward />

            <div>
              <h4>{progress?.totalAssessments || 0}</h4>

              <p>Assessments</p>
            </div>
          </div>

          <div className="mini-stat-card">
            <FiBarChart2 />

            <div>
              <h4>{progress?.averageScore || 0}%</h4>

              <p>Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {progressItems.length === 0 ? (
        <div className="progress-empty-state">
          <p>No assessment progress yet.</p>
        </div>
      ) : (
        <div className="progress-list">
          {progressItems.map((item) => (
            <div
              key={item?._id || item?.id}
              className={`progress-item ${
                item?.completed ? "completed" : "pending"
              }`}
            >
              {/* LEFT */}
              <div className="progress-info">
                <div
                  className={`progress-icon ${
                    item?.completed ? "done" : "waiting"
                  }`}
                >
                  {item?.completed ? <FiCheckCircle /> : <FiClock />}
                </div>

                <div className="progress-content">
                  <div className="progress-title-row">
                    <h4>{item?.title}</h4>

                    <span className="progress-score">{item?.score || 0}%</span>
                  </div>

                  <p>{item?.description}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="progress-action">
                <FiChevronRight />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="progress-footer-note">
        <FiTrendingUp />

        <p>
          Completing more assessments helps our AI generate more accurate
          recommendations.
        </p>
      </div>
    </section>
  );
}
