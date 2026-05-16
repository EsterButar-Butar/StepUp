export default function CVSkills({ skills = [] }) {
  return (
    <section className="cv-section">
      <h2>Skills</h2>

      <div className="cv-skills-grid">
        {skills.map((skill, index) => (
          <span key={index} className="cv-skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
