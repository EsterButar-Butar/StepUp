// src/components/assessmentselectskill/SkillDropdown.jsx

import { useState, useRef, useEffect } from "react";
import SkillSelect from "./SkillSelect";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import "../../styles/assessmentselectskill.css";

export default function SkillDropdown({
  label,
  skills = [],
  selectedSkills = [],
  setSelectedSkills,
  maxSkills = 10,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // FILTERED SKILLS
  const filteredSkills = skills.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !selectedSkills.includes(skill),
  );

  // ADD SKILL
  const addSkill = (skill) => {
    if (selectedSkills.length >= maxSkills) return;

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

  // CLOSE DROPDOWN OUTSIDE CLICK
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
      {/* HEADER */}
      <div className="skill-header-flex">
        <label className="skill-label">{label}</label>

        <div className="skill-counter">
          {selectedSkills.length}/{maxSkills} skills or less
        </div>
      </div>

      {/* SELECTED SKILLS */}
      <SkillSelect selectedSkills={selectedSkills} removeSkill={removeSkill} />

      {/* SEARCH */}
      <div className="skill-search-wrapper">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder={`Search ${label.toLowerCase()}...`}
          value={search}
          onFocus={() => setOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
          disabled={selectedSkills.length >= maxSkills}
        />

        <button
          type="button"
          className="dropdown-toggle"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <FiChevronDown />
        </button>
      </div>

      {/* DROPDOWN */}
      {open && (
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
