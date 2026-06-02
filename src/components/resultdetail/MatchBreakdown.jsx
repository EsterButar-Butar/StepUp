import { FaCode, FaHeart, FaBriefcase, FaGraduationCap } from "react-icons/fa";

import "../../styles/detailresult/matchbreakdown.css";

const iconMap = {
  technical: <FaCode />,
  interests: <FaHeart />,
  experience: <FaBriefcase />,
  academic: <FaGraduationCap />,
};

export default function MatchBreakdown({ breakdown = [] }) {
  return (
    <div className="mb-card">
      <div className="mb-header">
        <h3>Match Breakdown</h3>
      </div>

      <div className="mb-list">
        {breakdown.length === 0 ? (
          <p>No breakdown data available.</p>
        ) : (
          breakdown.map((item) => (
            <div key={item.id} className="mb-item">
              <div className="mb-label-row">
                <div className="mb-icon-label">
                  <span>{iconMap[item.type]}</span>

                  <span>{item.label}</span>
                </div>

                <span className="mb-value">{item.score}%</span>
              </div>

              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{
                    width: `${item.score}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
