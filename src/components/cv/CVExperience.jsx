export default function CVExperience({ experience = [] }) {
  if (experience.length === 0) return null;

  return (
    <section className="cv-section">
      <h2>Experience</h2>

      {experience.map((item, index) => (
        <div key={index} className="cv-item">
          <h3>{item.position || item.role || item.title}</h3>

          <span>
            {item.company || item.organization || item.companyName} •{" "}
            {item.duration}
          </span>

          <p>{item.responsibilities || item.description}</p>
        </div>
      ))}
    </section>
  );
}
