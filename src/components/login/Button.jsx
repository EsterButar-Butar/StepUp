export default function Button({ children, loading, disabled }) {
  return (
    <button
      type="submit"
      className="btn-login-main"
      disabled={loading || disabled}
    >
      {loading ? "Logging in..." : children}
    </button>
  );
}
