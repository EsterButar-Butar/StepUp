export default function CVCertifications({ certifications = [] }) {
  return (
    <section className="cv-section">
      <h2>Certifications</h2>

      {certifications.map((cert, index) => (
        <div key={index} className="cv-item">
          <h3>{cert.certificateName}</h3>

          <span>
            {cert.issuer} • {cert.year}
          </span>
        </div>
      ))}
    </section>
  );
}
