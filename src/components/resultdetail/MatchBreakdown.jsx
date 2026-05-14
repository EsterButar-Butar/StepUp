import { FaCode, FaHeart, FaBriefcase, FaGraduationCap } from "react-icons/fa";

const iconMap = {
  technical: <FaCode />,
  interests: <FaHeart />,
  experience: <FaBriefcase />,
  academic: <FaGraduationCap />,
};

export default function MatchBreakdown({ breakdown = [] }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Match Breakdown</h3>
      </div>

      <div className="breakdown-list">
        {breakdown.length === 0 ? (
          <p>No breakdown data available.</p>
        ) : (
          breakdown.map((item) => (
            <div key={item.id} className="breakdown-item">
              <div className="breakdown-top">
                <div className="breakdown-label">
                  <span className="icon">{iconMap[item.type]}</span>

                  <span>{item.label}</span>
                </div>

                <span>{item.score}%</span>
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
