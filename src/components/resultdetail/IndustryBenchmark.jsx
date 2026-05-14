import React from "react";
import { FiCheck, FiCpu, FiDatabase, FiGlobe, FiLayers } from "react-icons/fi";
import "../../styles/resultdetail/industrybenchmark.css";

export default function IndustryBenchmark({ benchmark }) {
  // Gunakan data props jika ada, jika tidak gunakan dummy sesuai gambar
  const responsibilities = benchmark?.responsibilities || [
    "Writing clean, maintainable code",
    "Participating in code reviews",
    "Collaborating with product teams",
  ];

  const tools = [
    { icon: <FiCpu />, name: "VS Code" },
    { icon: <FiLayers />, name: "Docker" },
    { icon: <FiDatabase />, name: "PostgreSQL" },
    { icon: <FiGlobe />, name: "AWS" },
  ];

  return (
    <div className="ib-card">
      <div className="ib-section">
        <h4 className="ib-subtitle">COMMON RESPONSIBILITIES</h4>
        <ul className="ib-list">
          {responsibilities.map((item, i) => (
            <li key={i} className="ib-item">
              <FiCheck className="ib-check" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="ib-section">
        <h4 className="ib-subtitle">TYPICAL TOOLS</h4>
        <div className="ib-tools-grid">
          {tools.map((tool, i) => (
            <div key={i} className="ib-tool-icon" title={tool.name}>
              {tool.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
