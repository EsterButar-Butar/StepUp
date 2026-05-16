export default function CVProjects({ projects = [] }) {
  return (
    <section className="cv-section">
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <div key={index} className="cv-item">
          <h3>{project.projectName}</h3>

          <span>{project.role}</span>

          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
}
