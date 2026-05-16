import {
  FiCheck,
  FiAlertTriangle,
  FiLayers,
  FiCpu,
  FiUsers,
} from "react-icons/fi";
import "../../styles/result/skillgap.css";

export default function SkillGap({ data }) {
  const iconMap = {
    tech: <FiCpu />,
    soft: <FiUsers />,
  };

  if (!data) return null;
  const RenderSection = ({ section }) => (
    <div className="sg-main-section">
      <div className="sg-section-divider">
        {iconMap[section.type]} <span>{section.title}</span>
      </div>
      <div className="sg-content">
        <div className="sg-column">
          <h4 className="sg-status-title success">
            <span className="dot success">●</span> SKILLS YOU HAVE
          </h4>
          {(section.have || []).map((skill, i) => (
            <div key={i} className="sg-item-plain">
              <div className="sg-icon-circle success">
                <FiCheck size={14} />
              </div>
              <div className="sg-item-info">
                <p className="sg-item-name">{skill.name}</p>
                <span className="sg-item-sub">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sg-column">
          <h4 className="sg-status-title warning">
            <span className="dot warning">●</span> SKILLS TO IMPROVE
          </h4>
          {(section.improve || []).map((skill, i) => (
            <div key={i} className="sg-card-improve">
              <div className="sg-card-content">
                <div className="sg-icon-circle warning">
                  <FiAlertTriangle size={14} />
                </div>
                <div className="sg-item-info">
                  <p className="sg-item-name">{skill.name}</p>
                  <span className="sg-item-sub">{skill.desc}</span>
                </div>
              </div>
              <button className="sg-btn-learn">Learn</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="sg-container">
      <div className="sg-header">
        <div className="sg-header-icon">
          <FiLayers size={20} />
        </div>
        <div className="sg-header-text">
          <h3>Skill Gap Analysis</h3>
          <p>Based on your top match: {data.career}</p>
        </div>
      </div>

      <RenderSection section={data.tech} />
      <div className="sg-spacer" />
      <RenderSection section={data.soft} />
    </div>
  );
}
