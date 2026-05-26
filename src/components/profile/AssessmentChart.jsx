import { useMemo } from "react";
import "../../styles/profile/assessment-chart.css";

export default function AssessmentChart({ activities = [] }) {
  const points = useMemo(() => {
    const items = Array.isArray(activities) ? activities : [];
    const sorted = items
      .filter((a) => a?.score !== undefined && a?.score !== null)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-5);

    return sorted.map((it) => ({
      label: it?.date ? new Date(it.date).toLocaleDateString() : "-",
      value: Number(it.score ?? it.match ?? 0),
    }));
  }, [activities]);

  if (!points || points.length === 0) {
    return (
      <section className="assessment-chart-card">
        <h3>Recent Assessment Scores</h3>
        <div className="chart-empty">No assessment scores available.</div>
      </section>
    );
  }

  const maxVal = Math.max(...points.map((p) => p.value), 100);

  return (
    <section className="assessment-chart-card">
      <h3>Recent Assessment Scores</h3>
      <div className="chart-wrapper">
        <svg viewBox={`0 0 ${points.length * 40} 100`} className="chart-svg">
          {points.map((p, i) => {
            const x = i * 40 + 10;
            const height = (p.value / maxVal) * 60;
            return (
              <g key={`${p.label}-${i}`}>
                <rect
                  x={x}
                  y={80 - height}
                  width={20}
                  height={height}
                  rx={4}
                  className="chart-bar"
                />
                <text
                  x={x + 10}
                  y={95}
                  textAnchor="middle"
                  className="chart-label"
                >
                  {p.label}
                </text>
                <text
                  x={x + 10}
                  y={75 - height}
                  textAnchor="middle"
                  className="chart-value"
                >
                  {p.value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
