export default function CVCertifications({ certifications = [] }) {
  if (certifications.length === 0) return null;

  return (
    <section className="cv-section">
      <h2>Certifications</h2>

      {certifications.map((cert, index) => (
        <div key={index} className="cv-item">
          <h3>{cert.certificateName || cert.name || cert.title}</h3>

          <span>
            {cert.issuer || cert.issuerName} • {cert.year || cert.date}
          </span>
        </div>
      ))}
    </section>
  );
}
