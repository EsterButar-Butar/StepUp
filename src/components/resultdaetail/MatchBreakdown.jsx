import { useEffect, useState } from "react";
import {
  FaCode,
  FaHeart,
  FaBriefcase,
  FaGraduationCap,
  FaChartPie,
} from "react-icons/fa"; // Menggunakan Fa untuk icon solid

import "./matchbreakdown.css";

export default function MatchBreakdown() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { label: "Technical Skills", value: 92 },
      { label: "Interests", value: 98 },
      { label: "Experience", value: 85 },
      { label: "Academic Alignment", value: 100 },
    ]);
  }, []);

  const getIcon = (label) => {
    if (label.includes("Technical")) return <FaCode />;
    if (label.includes("Interest")) return <FaHeart />;
    if (label.includes("Experience")) return <FaBriefcase />;
    return <FaGraduationCap />; // Graduation cap untuk Academic
  };

  const getColor = (label) => {
    if (label.includes("Technical")) return "#2563eb"; // Blue
    if (label.includes("Interest")) return "#6366f1"; // Indigo/Purple
    if (label.includes("Experience")) return "#475569"; // Slate dark
    return "#1e293b"; // Navy/Dark Slate untuk Academic
  };

  return (
    <div className="mb-card">
      <div className="mb-header">
        <h3>Match Breakdown</h3>
        <FaChartPie className="mb-header-icon" />
      </div>

      <div className="mb-list">
        {data.map((item, i) => (
          <div key={i} className="mb-item">
            <div className="mb-top">
              <div className="mb-left">
                <span
                  className="mb-icon"
                  style={{ color: getColor(item.label) }}
                >
                  {getIcon(item.label)}
                </span>
                <span>{item.label}</span>
              </div>
              <span className="mb-value">{item.value}%</span>
            </div>

            <div className="mb-bar">
              <div
                className="mb-fill"
                style={{
                  width: `${item.value}%`,
                  background: getColor(item.label),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
