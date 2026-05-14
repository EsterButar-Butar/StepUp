// src/components/profile/RecentActivity.jsx

import {
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiTrendingUp,
  FiDownload,
  FiFileText,
  FiStar,
  FiActivity,
} from "react-icons/fi";

import "../../styles/profile/recent-activity.css";

export default function RecentActivity({ activities = [] }) {
  // FALLBACK ACTIVITIES
  const fallbackActivities = [
    {
      title: "Completed interest assessment",

      description: "Your assessment has been saved successfully.",

      date: "May 15, 2026",

      type: "assessment",
    },

    {
      title: "Generated career result",

      description: "Your AI-powered career analysis is ready.",

      date: "May 16, 2026",

      type: "result",
    },

    {
      title: "Generated ATS-ready CV",

      description: "Your professional CV has been created.",

      date: "May 17, 2026",

      type: "cv",
    },

    {
      title: "Completed skills assessment",

      description: "Technical and soft skills updated.",

      date: "May 18, 2026",

      type: "skills",
    },
  ];

  // USE REAL DATA OR FALLBACK
  const activityData = activities.length > 0 ? activities : fallbackActivities;

  // ICONS BY TYPE
  const getActivityIcon = (type) => {
    switch (type) {
      case "assessment":
        return <FiCheckCircle />;

      case "result":
        return <FiTrendingUp />;

      case "cv":
        return <FiFileText />;

      case "skills":
        return <FiStar />;

      default:
        return <FiActivity />;
    }
  };

  // COLORS BY TYPE
  const getActivityColor = (type) => {
    switch (type) {
      case "assessment":
        return "purple";

      case "result":
        return "green";

      case "cv":
        return "orange";

      case "skills":
        return "blue";

      default:
        return "gray";
    }
  };

  return (
    <section className="recent-activity-card">
      {/* HEADER */}
      <div className="section-header">
        <div>
          <h3>Recent Activity</h3>

          <p>
            Track your latest progress, assessments, and AI-generated results.
          </p>
        </div>

        {/* STATUS */}
        <div className="activity-status">
          <FiClock />
          Recently Updated
        </div>
      </div>

      {/* ACTIVITY LIST */}
      <div className="activity-list">
        {activityData.map((activity, index) => (
          <div key={index} className="activity-item">
            {/* LEFT */}
            <div className="activity-left">
              {/* ICON */}
              <div
                className={`activity-icon ${getActivityColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>

              {/* CONTENT */}
              <div className="activity-content">
                <div className="activity-top-row">
                  <h4>{activity.title}</h4>

                  <span className="activity-badge">{activity.type}</span>
                </div>

                <p>{activity.description}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="activity-right">
              <span className="activity-date">{activity.date}</span>

              <button type="button" className="activity-action-btn">
                <FiChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="activity-footer">
        <button type="button" className="view-all-activity-btn">
          <FiDownload />
          Export Activity History
        </button>
      </div>
    </section>
  );
}
