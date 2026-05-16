export default function CVExperience({ experience = [] }) {
  return (
    <section className="cv-section">
      <h2>Experience</h2>

      {experience.map((item, index) => (
        <div key={index} className="cv-item">
          <h3>{item.position}</h3>

          <span>
            {item.company} • {item.duration}
          </span>

          <p>{item.responsibilities}</p>
        </div>
      ))}
    </section>
  );
}
