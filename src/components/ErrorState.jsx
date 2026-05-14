import { FiAlertTriangle } from "react-icons/fi";
import "../styles/errorstate.css";

export default function ErrorState({ message = "Something went wrong" }) {
  return (
    <div className="error-wrapper">
      <div className="error-card">
        <div className="error-icon">
          <FiAlertTriangle />
        </div>

        <h2>Oops!</h2>

        <p>{message}</p>

        <button className="retry-btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
}
