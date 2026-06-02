import { FiAlertTriangle } from "react-icons/fi";
import "../styles/errorstate.css";

export default function ErrorState({
  message = "Something went wrong",
  onRetry = () => window.location.reload(),
}) {
  return (
    <div className="error-wrapper">
      <div className="error-card">
        <div className="error-icon">
          <FiAlertTriangle />
        </div>

        <h2>Oops!</h2>

        <p>{message}</p>

        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
}
