import "../../styles/assessment-progress-header.css";

export default function AssessmentProgressHeader({
  currentStep,
  totalSteps,
  progressPercentage,
}) {
  return (
    <div className="assessment-progress">
      <span>
        {currentStep} of {totalSteps} steps completed
      </span>
      <span>{progressPercentage}% progress</span>
    </div>
  );
}
