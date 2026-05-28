// src/pages/ForgotPassword.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiMail, FiArrowLeft } from "react-icons/fi";

import Logo from "../assets/S.png";

import "../styles/forgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Reset password for:", email);

      setSuccess("Password reset link has been sent to your email.");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-container">
        {/* LEFT SIDE */}
        <div className="fp-branding-side">
          <div className="fp-logo-wrapper">
            <img src={Logo} alt="StepUp Logo" className="fp-logo" />

            <p className="fp-tagline">
              Recover your account and continue your journey with StepUp
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="fp-auth-side">
          <div className="fp-card">
            {/* BACK BUTTON */}
            <button className="fp-back-btn" onClick={() => navigate("/login")}>
              <FiArrowLeft />
              Back to Login
            </button>

            {/* HEADER */}
            <div className="fp-header">
              <h2>Forgot Password</h2>

              <p>
                Enter your email address and we’ll send you a password reset
                link.
              </p>
            </div>

            {/* ERROR */}
            {error && <div className="fp-error-message">{error}</div>}

            {/* SUCCESS */}
            {success && <div className="fp-success-message">{success}</div>}

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* EMAIL INPUT */}
              <div className="fp-input-group">
                <label>Email Address</label>

                <div className="fp-input-wrapper">
                  <FiMail className="fp-input-icon" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="fp-submit-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
