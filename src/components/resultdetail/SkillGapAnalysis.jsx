// src/components/resultdetail/SkillGapAnalysis.jsx

import {
  FiCheck,
  FiTrendingUp,
  FiAlertCircle,
  FiCode,
  FiUsers,
  FiSearch,
} from "react-icons/fi";

import "../../styles/detailresult/skillgapanalysis.css";

export default function SkillGapAnalysis({ skills = {} }) {
  return (
    <div className="skill-gap-analysis">
      {/* HEADER */}
      <div className="sga-header">
        <h3>Skill Gap Analysis</h3>

        <FiSearch className="header-icon" />
      </div>

      {/* TECHNICAL */}
      <div className="skill-section">
        <div className="skill-title">
          <FiCode />
          <span>Technical Skills</span>
        </div>

        <div className="skill-columns">
          {/* HAVE */}
          <div className="skill-card">
            <div className="skill-card-header">
              <div className="icon success">
                <FiCheck />
              </div>

              <span>You Have</span>
            </div>

            <div className="skill-list">
              {(skills?.technical?.have || []).map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span>{skill.name}</span>

                  <div className="badge success-badge">Advanced</div>
                </div>
              ))}
            </div>
          </div>

          {/* IMPROVE */}
          <div className="skill-card">
            <div className="skill-card-header">
              <div className="icon warning">
                <FiTrendingUp />
              </div>

              <span>To Improve</span>
            </div>

            <div className="skill-list">
              {(skills?.technical?.improve || []).map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span>{skill.name}</span>

                  <div className="badge warning-badge">Intermediate</div>
                </div>
              ))}
            </div>
          </div>

          {/* MISSING */}
          <div className="skill-card">
            <div className="skill-card-header">
              <div className="icon danger">
                <FiAlertCircle />
              </div>

              <span>Missing</span>
            </div>

            <div className="skill-list">
              {(skills?.technical?.missing || []).map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span>{skill.name}</span>

                  <FiAlertCircle className="missing-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOFT */}
      <div className="skill-section">
        <div className="skill-title">
          <FiUsers />
          <span>Soft Skills</span>
        </div>

        <div className="skill-columns">
          {/* HAVE */}
          <div className="skill-card">
            <div className="skill-card-header">
              <div className="icon success">
                <FiCheck />
              </div>

              <span>You Have</span>
            </div>

            <div className="skill-list">
              {(skills?.soft?.have || []).map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span>{skill.name}</span>

                  <div className="badge success-badge">Advanced</div>
                </div>
              ))}
            </div>
          </div>

          {/* IMPROVE */}
          <div className="skill-card">
            <div className="skill-card-header">
              <div className="icon warning">
                <FiTrendingUp />
              </div>

              <span>To Improve</span>
            </div>

            <div className="skill-list">
              {(skills?.soft?.improve || []).map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span>{skill.name}</span>

                  <div className="badge warning-badge">Beginner</div>
                </div>
              ))}
            </div>
          </div>

          {/* MISSING */}
          <div className="skill-card">
            <div className="skill-card-header">
              <div className="icon danger">
                <FiAlertCircle />
              </div>

              <span>Missing</span>
            </div>

            <div className="skill-list">
              {(skills?.soft?.missing || []).map((skill) => (
                <div key={skill.id} className="skill-item">
                  <span>{skill.name}</span>

                  <FiAlertCircle className="missing-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
