import "../../styles/landingpage/how.css";
import { FiEdit3, FiCpu, FiMap } from "react-icons/fi"; // Icon disesuaikan mockup

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Build Profile",
      desc: "Enter your academic background, skills, and interests into our structured assessment.",
      icon: <FiEdit3 size={24} />,
      colorClass: "how-blue",
    },
    {
      id: 2,
      title: "AI Analysis",
      desc: "Our engine cross-references your profile with thousands of career trajectories and market data.",
      icon: <FiCpu size={24} />,
      colorClass: "how-purple",
    },
    {
      id: 3,
      title: "Get Recommendations",
      desc: "Receive detailed career matches, skill gap analysis, and a personalized roadmap.",
      icon: <FiMap size={24} />,
      colorClass: "how-green",
    },
  ];

  return (
    <section className="how-section">
      <div className="how-container">
        {/* HEADER */}
        <div className="how-header">
          <h2 className="how-title-main">How StepUp Works</h2>
          <p className="how-p-sub">
            Three simple steps to uncover your ideal career trajectory.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="how-grid">
          {/* Garis penghubung putus-putus sesuai mockup */}
          <div className="how-connecting-line" />

          {steps.map((step) => (
            <div key={step.id} className="how-step-card">
              <div className={`how-icon-box ${step.colorClass}`}>
                {step.icon}
                <div className="how-step-number">{step.id}</div>
              </div>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
