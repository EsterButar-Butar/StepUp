import {
  FiCheck,
  FiAlertTriangle,
  FiLayers,
  FiCpu,
  FiUsers,
} from "react-icons/fi";
import "../../styles/result/skillgap.css";

export default function SkillGap() {
  const skillData = {
    tech: {
      title: "Tech Skills",
      icon: <FiCpu />,
      have: [
        { name: "HTML5 & CSS3", level: "Advanced proficiency" },
        { name: "JavaScript (ES6+)", level: "Intermediate proficiency" },
      ],
      improve: [
        { name: "React.js Framework", desc: "Core requirement" },
        { name: "API Integration", desc: "Basic knowledge needed" },
      ],
    },
    soft: {
      title: "Soft Skills",
      icon: <FiUsers />,
      have: [{ name: "Problem Solving", level: "Strong analytical skill" }],
      improve: [
        {
          name: "Public Speaking",
          desc: "Needed for stakeholder presentations",
        },
        { name: "Technical Writing", desc: "Documentation skills" },
      ],
    },
  };

  const RenderSection = ({ section }) => (
    <div className="sg-main-section">
      <div className="sg-section-divider">
        {section.icon} <span>{section.title}</span>
      </div>
      <div className="sg-content">
        <div className="sg-column">
          <h4 className="sg-status-title success">
            <span className="dot success">●</span> SKILLS YOU HAVE
          </h4>
          {section.have.map((skill, i) => (
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
          {section.improve.map((skill, i) => (
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
          <p>Based on your top match: Frontend Developer</p>
        </div>
      </div>

      <RenderSection section={skillData.tech} />
      <div className="sg-spacer" />
      <RenderSection section={skillData.soft} />
    </div>
  );
}
