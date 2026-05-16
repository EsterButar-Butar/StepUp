export default function CVOrganizations({ organizations = [] }) {
  if (organizations.length === 0) return null;

  return (
    <section className="cv-section">
      <h2>Organizations</h2>

      {organizations.map((org, index) => (
        <div key={index} className="cv-item">
          <h3>{org.organizationName}</h3>

          <span>
            {org.role} • {org.duration}
          </span>
        </div>
      ))}
    </section>
  );
}
