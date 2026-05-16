export default function CVATSScore({ score }) {
  return (
    <div className="ats-card">
      <h3>ATS Compatibility</h3>

      <div className="ats-score">{score}%</div>
    </div>
  );
}
