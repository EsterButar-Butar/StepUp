import {
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiTrendingUp,
  FiFileText,
  FiStar,
  FiActivity,
} from "react-icons/fi";

import "../../styles/profile/recent-activity.css";

export default function RecentActivity({ activities = [] }) {
  const activityData = Array.isArray(activities) ? activities : [];

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "Unknown date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ICONS
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

  // COLORS
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

      {/* EMPTY STATE */}
      {activityData.length === 0 ? (
        <div className="activity-empty-state">
          <FiActivity />

          <h4>No recent activities</h4>

          <p>Your latest activities will appear here.</p>
        </div>
      ) : (
        <div className="activity-list">
          {activityData.map((activity, index) => (
            <div
              key={activity?._id || activity?.id || `activity-${index}`}
              className="activity-item"
            >
              {/* LEFT */}
              <div className="activity-left">
                {/* ICON */}
                <div
                  className={`activity-icon ${getActivityColor(
                    activity?.type,
                  )}`}
                >
                  {getActivityIcon(activity?.type)}
                </div>

                {/* CONTENT */}
                <div className="activity-content">
                  <div className="activity-top-row">
                    <h4>{activity?.title || "Untitled Activity"}</h4>

                    <span className="activity-badge">
                      {activity?.type || "general"}
                    </span>
                  </div>

                  <p>{activity?.description || "No description available."}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="activity-right">
                <span className="activity-date">
                  {formatDate(activity?.date)}
                </span>

                <button type="button" className="activity-action-btn">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
