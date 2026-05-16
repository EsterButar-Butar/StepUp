export default function CVHeader({ user = {} }) {
  return (
    <section className="cv-header">
      <h1>{user.name}</h1>

      <p>
        {user.email} • {user.phone} • {user.location}
      </p>

      <p>
        {user.linkedin} • {user.github}
      </p>
    </section>
  );
}
