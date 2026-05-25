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
  const percentage = Math.min(
    Math.max(Number(progress?.percentage) || 0, 0),
    100,
  );
  const currentStep = Number(progress?.currentStep) || 0;
  const totalSteps = Number(progress?.totalSteps) || 0;
  const providedItems = Array.isArray(progress?.items)
    ? progress.items
    : progress?.steps;
  const progressItems = Array.isArray(providedItems)
    ? providedItems
    : totalSteps > 0
      ? Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;

          return {
            id: `step-${stepNumber}`,
            title: `Step ${stepNumber}`,
            description:
              stepNumber <= currentStep
                ? "Completed"
                : "Waiting to be completed",
            completed: stepNumber <= currentStep,
            score: stepNumber <= currentStep ? 100 : 0,
          };
        })
      : [];

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
              <h4>{currentStep}</h4>

              <p>Current Step</p>
            </div>
          </div>

          <div className="mini-stat-card">
            <FiBarChart2 />

            <div>
              <h4>{totalSteps}</h4>

              <p>Total Steps</p>
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
          {progressItems.map((item, index) => (
            <div
              key={item?._id || item?.id || `progress-item-${index}`}
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
                    <h4>{item?.title || "Untitled step"}</h4>

                    <span className="progress-score">{item?.score ?? 0}%</span>
                  </div>

                  <p>{item?.description || "No description available."}</p>
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
