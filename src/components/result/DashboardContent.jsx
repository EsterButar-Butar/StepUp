import TopMatches from "./TopMatchesGrid.jsx";
import SkillGap from "./SkillGap.jsx";
import { RefreshCcw } from "lucide-react";
import "../../styles/result/dashboard.css";

export default function DashboardContent() {
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
        <button className="btn-recalculate">
          <RefreshCcw size={16} /> Recalculate
        </button>
      </div>

      {/* Main Content */}
      <TopMatches />

      <SkillGap />

      {/* Footer Section */}
      <div className="dashboard-footer">
        <button className="btn-primary-dark">
          View Detailed Career Path →
        </button>
      </div>
    </div>
  );
}
