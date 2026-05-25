import "../styles/loadingspinner.css";

export default function LoadingSpinner({
  title = "Loading Data",
  message = "Please wait while we prepare your recommendation results...",
}) {
  return (
    <div className="loading-wrapper">
      <div className="loading-card">
        <div className="spinner"></div>

        <h2>{title}</h2>

        <p>{message}</p>
      </div>
    </div>
  );
}
