import TopMatches from "./TopMatchesGrid.jsx";
import SkillGap from "./SkillGap.jsx";
import { useNavigate } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import "../../styles/result/dashboard.css";

export default function DashboardContent({ result }) {
  const navigate = useNavigate();
  const topCareer = result.topMatches?.[0];

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header-inline">
        <div className="header-text">
          <h2 className="dashboard-title">Your Career Matches</h2>
          <p className="dashboard-subtitle">
            Based on your recent assessments and learning progress, we've
            identified the top roles that fit your profile.
          </p>
        </div>
        <button
          className="btn-recalculate"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw size={16} /> Recalculate
        </button>
      </div>

      {/* Main Content */}
      <TopMatches data={result.topMatches} />

      <SkillGap data={result.skillGap} />

      {/* Footer Section */}
      <div className="dashboard-footer">
        <button
          className="btn-primary-dark"
          onClick={() => {
            if (!topCareer) return;

            navigate(`/detail-result/${topCareer.careerId}`);
          }}
        >
          View Detailed Career Path →
        </button>
      </div>
    </div>
  );
}
