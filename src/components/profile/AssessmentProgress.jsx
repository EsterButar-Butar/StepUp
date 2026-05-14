// src/components/profile/AssessmentProgress.jsx

import {
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiTrendingUp,
  FiAward,
  FiBarChart2,
} from "react-icons/fi";

import "../../styles/profile/assessment-progress.css";

export default function AssessmentProgress({ progress }) {
  // FALLBACK DATA
  const percentage = progress?.percentage || 75;

  // PROGRESS ITEMS
  const progressItems = [
    {
      title: "Personality Assessment",

      description: progress?.personality
        ? "Completed successfully"
        : "Not completed yet",

      completed: progress?.personality,

      score: "92%",
    },

    {
      title: "Skills & Interests",

      description: progress?.skills
        ? "Completed successfully"
        : "Not completed yet",

      completed: progress?.skills,

      score: "88%",
    },

    {
      title: "Experience Assessment",

      description: progress?.experience
        ? "Completed successfully"
        : "Not completed yet",

      completed: progress?.experience,

      score: "76%",
    },
  ];

  return (
    <section className="assessment-progress-card">
      {/* HEADER */}
      <div className="section-header">
        <div>
          <h3>Assessment Progress</h3>

          <p>Track your onboarding and assessment journey.</p>
        </div>

        {/* BADGE */}
        <div className="progress-status-badge">
          <FiTrendingUp />
          Active Progress
        </div>
      </div>

      {/* TOP PROGRESS */}
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
              <h4>3</h4>

              <p>Assessments</p>
            </div>
          </div>

          <div className="mini-stat-card">
            <FiBarChart2 />

            <div>
              <h4>85%</h4>

              <p>Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="progress-list">
        {progressItems.map((item, index) => (
          <div
            key={index}
            className={`progress-item ${
              item.completed ? "completed" : "pending"
            }`}
          >
            {/* LEFT */}
            <div className="progress-info">
              <div
                className={`progress-icon ${
                  item.completed ? "done" : "waiting"
                }`}
              >
                {item.completed ? <FiCheckCircle /> : <FiClock />}
              </div>

              <div className="progress-content">
                <div className="progress-title-row">
                  <h4>{item.title}</h4>

                  <span className="progress-score">{item.score}</span>
                </div>

                <p>{item.description}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="progress-action">
              <FiChevronRight />
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="progress-footer-note">
        <FiTrendingUp />

        <p>
          Completing more assessments helps our AI generate more accurate career
          recommendations and personalized CV insights.
        </p>
      </div>
    </section>
  );
}
