import "../styles/assessment-sidebar.css";

const steps = [
  {
    number: 1,
    title: "Personal",
    description: "Basic profile and education",
  },
  {
    number: 2,
    title: "Skills",
    description: "Technical and soft skills",
  },
  {
    number: 3,
    title: "Experience",
    description: "Projects and activities",
  },
];

export default function AssessmentSidebar({ currentStep = 1 }) {
  return (
    <aside className="assessment-sidebar">
      <h2>Assessment</h2>
      <p>Complete each step so StepUp can personalize your career insights.</p>

      <div className="steps">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step ${currentStep === step.number ? "active" : ""}`}
          >
            <div className="step-number">{step.number}</div>
            <div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
