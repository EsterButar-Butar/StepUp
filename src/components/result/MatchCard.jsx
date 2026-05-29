import "../../styles/result/matchcard.css";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Code2 } from "lucide-react";

export default function MatchCard({
  careerId,
  career,
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
  const safeColor = color || {
    bg: "#dbeafe",
    badgeBg: "#eff6ff",
    text: "#2563eb",
  };
  const safeMatch = Number(match || 0);
  const safeProgress = Math.max(
    0,
    Math.min(Number(progress || safeMatch), 100),
  );

  return (
    <div className="tm-match-card">
      <div className="tm-match-header">
        <div className="tm-icon-box" style={{ backgroundColor: safeColor.bg }}>
          <SafeIcon size={20} color={safeColor.text} />
        </div>

        <div
          className="tm-match-badge"
          style={{ backgroundColor: safeColor.badgeBg, color: safeColor.text }}
        >
          <span className="tm-badge-dot">•</span> {safeMatch}% Match
        </div>
      </div>

      <div className="tm-card-body">
        <h3 className="tm-card-title">{title}</h3>
        <p className="tm-card-desc">{description}</p>
      </div>

      <div className="tm-readiness-section">
        <div className="tm-readiness-label">
          <span>Readiness</span>
          <span
            className="tm-readiness-value"
            style={{ color: safeColor.text }}
          >
            {readiness}
          </span>
        </div>
        <div className="tm-progress-container">
          <div
            className="tm-progress-bar"
            style={{
              width: `${safeProgress}%`,
              backgroundColor: safeColor.text,
            }}
          />
        </div>
      </div>

      <div className="tm-card-footer">
        <button
          type="button"
          className="tm-btn-view"
          disabled={!careerId}
          onClick={() => {
            if (!careerId) return;

            console.log("Career clicked:", career);
            navigate(`/detail-result/${careerId}`);
          }}
        >
          View Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
