export default function RegisterButton({ children, loading }) {
  return (
    <button type="submit" className="su-btn-main" disabled={loading}>
      {loading ? "Creating..." : children}
    </button>
  );
}
