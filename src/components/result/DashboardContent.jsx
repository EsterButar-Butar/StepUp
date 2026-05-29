import TopMatches from "./TopMatchesGrid.jsx";
import SkillGap from "./SkillGap.jsx";
import { useNavigate } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import "../../styles/result/dashboard.css";

export default function DashboardContent({ result, assessmentId }) {
  const navigate = useNavigate();
  const recommendations = result?.career_recommendations || [];
  const topCareer = recommendations[0];
  const detailId = topCareer?.careerId;

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
      <TopMatches data={recommendations} assessmentId={assessmentId} />

      <SkillGap data={result?.skill_gap_detailed} />

      {/* Footer Section */}
      <div className="dashboard-footer">
        <button
          type="button"
          className="btn-primary-dark"
          onClick={() => {
            if (!topCareer) return;

            navigate(`/detail-result/${detailId}`);
          }}
          disabled={!detailId}
        >
          View Detailed Career Path →
        </button>
      </div>
    </div>
  );
}
