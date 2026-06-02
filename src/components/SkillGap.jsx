import {
  FiCheckCircle,
  FiTrendingUp,
  FiAlertCircle,
  FiLayers,
} from "react-icons/fi";
import "../styles/result2/skillgap.css";
import { skillGapData } from "../data/skillGapData";

export default function SkillGap({ data = skillGapData, showHeader = true }) {
  const {
    skillsHave = [],
    skillsImprove = [],
    missingSkills = [],
  } = data || {};

  return (
    <div className="rcs-container">
      {/* HEADER */}
      {showHeader && (
        <div className="rcs-header">
          <FiLayers className="rcs-header-icon" />
          <div className="rcs-header-text">
            <h3>Skill Gap Analysis</h3>
            <p>Highly recommended for your matched careers.</p>
          </div>
        </div>
      )}

      <div className="rcs-body">
        {/* SKILLS YOU HAVE */}
        <div className="rcs-section">
          <h4 className="rcs-section-title success">
            <FiCheckCircle /> Skills You Have
          </h4>
          <div className="rcs-tag-container">
            {skillsHave.map((skill, i) => (
              <span key={i} className="rcs-tag success">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* SKILLS TO IMPROVE */}
        <div className="rcs-section">
          <h4 className="rcs-section-title warning">
            <FiTrendingUp /> Skills to Improve
          </h4>

          {skillsImprove.map((item, i) => (
            <div key={i} className="rcs-progress-item">
              <div className="rcs-progress-info">
                <span className="name">{item.name}</span>
                <span className="level">{item.level}</span>
              </div>

              <div className="rcs-progress-bg">
                <div
                  className="rcs-progress-fill"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* MISSING SKILLS (OPTIONAL) */}
        {missingSkills.length > 0 && (
          <div className="rcs-section">
            <h4 className="rcs-section-title danger">
              <FiAlertCircle /> Missing Skills
            </h4>

            <div className="rcs-tag-container">
              {missingSkills.map((skill, i) => (
                <span key={i} className="rcs-tag danger">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
