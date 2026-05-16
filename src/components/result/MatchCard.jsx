import "../../styles/result/matchcard.css";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Code2 } from "lucide-react";

export default function MatchCard({
  careerId,
  title,
  match,
  description,
  readiness,
  progress,
  color,
  Icon,
}) {
  const navigate = useNavigate();
  const SafeIcon = Icon || Code2;
  return (
    <div className="tm-match-card">
      <div className="tm-match-header">
        <div className="tm-icon-box" style={{ backgroundColor: color.bg }}>
          <SafeIcon size={20} color={color.text} />
        </div>

        <div
          className="tm-match-badge"
          style={{ backgroundColor: color.badgeBg, color: color.text }}
        >
          <span className="tm-badge-dot">●</span> {match}% Match
        </div>
      </div>

      <div className="tm-card-body">
        <h3 className="tm-card-title">{title}</h3>
        <p className="tm-card-desc">{description}</p>
      </div>

      <div className="tm-readiness-section">
        <div className="tm-readiness-label">
          <span>Readiness</span>
          <span className="tm-readiness-value" style={{ color: color.text }}>
            {readiness}
          </span>
        </div>
        <div className="tm-progress-container">
          <div
            className="tm-progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: color.text,
            }}
          />
        </div>
      </div>

      <div className="tm-card-footer">
        <button
          className="tm-btn-view"
          onClick={() => navigate(`/detail-result/${careerId}`)}
        >
          View Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
