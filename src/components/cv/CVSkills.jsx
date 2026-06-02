export default function CVSkills({
  technicalSkills = [],
  softSkills = [],
  skills = [],
}) {
  const technical = Array.isArray(technicalSkills)
    ? technicalSkills
    : Array.isArray(skills?.technical)
      ? skills.technical
      : Array.isArray(skills)
        ? skills
        : [];

  const soft = Array.isArray(softSkills)
    ? softSkills
    : Array.isArray(skills?.soft)
      ? skills.soft
      : [];

  const hasTechnical = technical.length > 0;
  const hasSoft = soft.length > 0;

  const hasGeneric = Array.isArray(skills) && skills.length > 0;
  if (!hasTechnical && !hasSoft && !hasGeneric) {
    return null;
  }

  return (
    <section className="cv-section">
      {hasGeneric && !hasTechnical && !hasSoft ? (
        <div className="cv-skill-section">
          <h2>Skills</h2>

          <div className="cv-skills-grid">
            {skills.map((skill, index) => (
              <span key={`generic-${index}`} className="cv-skill-chip">
                {skill.name || skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {hasTechnical ? (
        <div className="cv-skill-section">
          <h2>Technical Skills</h2>
          <div className="cv-skills-grid">
            {technical.map((skill, index) => (
              <span key={`tech-${index}`} className="cv-skill-chip">
                {skill.name || skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {hasSoft ? (
        <div className="cv-skill-section">
          <h2>Soft Skills</h2>
          <div className="cv-skills-grid">
            {soft.map((skill, index) => (
              <span key={`soft-${index}`} className="cv-skill-chip">
                {skill.name || skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
