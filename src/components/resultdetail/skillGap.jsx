export default function SkillGap({ skills }) {
  // fallback supaya tidak undefined
  const safeSkills = skills || {
    have: [],
    improve: [],
    missing: [],
  };

  return (
    <div className="card">
      <h3>Skill Gap Analysis</h3>

      <div className="skill-grid">
        {/* HAVE */}
        <div>
          <h4>You Have</h4>

          {safeSkills.have.map((skill) => (
            <div key={skill.id} className="skill-item success">
              {skill.name}
            </div>
          ))}
        </div>

        {/* IMPROVE */}
        <div>
          <h4>To Improve</h4>

          {safeSkills.improve.map((skill) => (
            <div key={skill.id} className="skill-item warning">
              {skill.name}
            </div>
          ))}
        </div>

        {/* MISSING */}
        <div>
          <h4>Missing</h4>

          {safeSkills.missing.map((skill) => (
            <div key={skill.id} className="skill-item danger">
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
