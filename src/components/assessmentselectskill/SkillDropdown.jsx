// src/components/assessmentselectskill/SkillDropdown.jsx

import { useState, useRef, useEffect } from "react";
import SkillSelect from "./SkillSelect";
import { FiSearch, FiX, FiChevronDown } from "react-icons/fi";
import "../../styles/assessmentselectskill.css";

export default function SkillDropdown({
  label,
  skills,
  selectedSkills,
  setSelectedSkills,
}) {
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  // FILTERED SKILLS
  const filteredSkills = skills.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !selectedSkills.includes(skill),
  );

  // ADD SKILL
  const MAX_SKILLS = label === "Technical Skills" ? 10 : 5;

  const addSkill = (skill) => {
    if (selectedSkills.length >= MAX_SKILLS) {
      return;
    }

    setSelectedSkills([...selectedSkills, skill]);

    setSearch("");

    setOpen(false);
  };

  // REMOVE SKILL
  const removeSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove),
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="skill-dropdown-container" ref={dropdownRef}>
      <label className="skill-label">{label}</label>
      <div className="skill-counter">
        {selectedSkills.length}/{label === "Technical Skills" ? 10 : 5} skills
        or less
      </div>

      <SkillSelect selectedSkills={selectedSkills} removeSkill={removeSkill} />

      <div className="skill-search-wrapper">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder={`Search ${label.toLowerCase()}...`}
          value={search}
          onFocus={() => setOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
          disabled={selectedSkills.length >= MAX_SKILLS}
        />

        <button
          type="button"
          className="dropdown-toggle"
          onClick={() => setOpen(!open)}
        >
          <FiChevronDown />
        </button>
      </div>

      {/* DROPDOWN */}
      {open && search.trim() !== "" && (
        <div className="skills-dropdown">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <button
                type="button"
                key={skill}
                className="skill-option"
                onClick={() => addSkill(skill)}
              >
                {skill}
              </button>
            ))
          ) : (
            <div className="no-skill">No skills found</div>
          )}
        </div>
      )}
    </div>
  );
}
