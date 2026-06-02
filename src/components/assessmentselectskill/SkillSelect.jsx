import { FiX } from "react-icons/fi";
import "../../styles/assessmentselectskill.css";

export default function SkillSelect({ selectedSkills, removeSkill }) {
  if (selectedSkills.length === 0) {
    return <div className="empty-skill">No skills selected yet</div>;
  }

  return (
    <div className="selected-skills">
      {selectedSkills.map((skill) => (
        <div key={skill} className="skill-chip">
          <span>{skill}</span>

          <button
            type="button"
            className="remove-skill-btn"
            onClick={() => removeSkill(skill)}
          >
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
}
