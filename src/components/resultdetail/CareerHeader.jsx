import {
  FiMonitor,
  FiHeart,
  FiBriefcase,
  FiAward,
  FiInfo,
} from "react-icons/fi";
import "../../styles/resultdetail/matchbreakdown.css";

export default function MatchBreakdown() {
  const stats = [
    {
      label: "Technical Skills",
      value: 92,
      icon: <FiMonitor />,
      color: "#2563eb",
    },
    { label: "Interests", value: 95, icon: <FiHeart />, color: "#ec4899" },
    { label: "Experience", value: 85, icon: <FiBriefcase />, color: "#475569" },
    {
      label: "Academic Alignment",
      value: 100,
      icon: <FiAward />,
      color: "#0f172a",
    },
  ];

  return (
    <div className="mb-card">
      <div className="mb-header">
        <h3>Match Breakdown</h3>
        <FiInfo className="info-icon" />
      </div>

      <div className="mb-list">
        {stats.map((item, i) => (
          <div key={i} className="mb-item">
            <div className="mb-label-row">
              <span className="mb-icon-label">
                {item.icon} {item.label}
              </span>
              <span className="mb-value">{item.value}%</span>
            </div>
            <div className="progress-bg">
              <div
                className="progress-fill"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
