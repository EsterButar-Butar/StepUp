export default function CVProjects({ projects = [] }) {
  if (projects.length === 0) return null;

  return (
    <section className="cv-section">
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <div key={index} className="cv-item">
          <h3>{project.projectName || project.name || project.title}</h3>

          <span>{project.role}</span>

          <p>{project.description || project.details || project.summary}</p>
        </div>
      ))}
    </section>
  );
}
