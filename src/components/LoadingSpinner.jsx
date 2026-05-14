import "../styles/loadingspinner.css";

export default function LoadingSpinner() {
  return (
    <div className="loading-wrapper">
      <div className="loading-card">
        <div className="spinner"></div>

        <h2>Loading Data</h2>

        <p>Please wait while we prepare your recommendation results...</p>
      </div>
    </div>
  );
}
