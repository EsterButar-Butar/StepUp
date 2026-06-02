import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import InputField from "../components/login/InputField";
import PasswordField from "../components/login/PasswordField";
import Button from "../components/login/Button";
import ErrorMessage from "../components/ErrorMessage";

import { login } from "../services/authService";

import "../styles/login.css";

import Logo from "../assets/S.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await login({ email, password });

      navigate("/landing");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="branding-side">
          <div className="lg-wrapper">
            <img src={Logo} alt="StepUp Logo" className="stepup-logo" />
            <p className="branding-tagline">
              Elevate your journey to the next level
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-side">
          <div className="login-card">
            {/* HEADER */}
            <div className="card-header">
              <h2>Welcome Back</h2>
              <p>Please enter your details</p>
            </div>

            {/* ERROR */}
            <ErrorMessage message={error} />

            {/* FORM */}
            <form onSubmit={handleLogin}>
              {/* EMAIL */}
              <InputField
                label="Email Address"
                icon={<FiMail />}
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* PASSWORD */}
              <PasswordField
                password={password}
                setPassword={setPassword}
                navigate={navigate}
              />

              {/* BUTTON */}
              <Button loading={loading} disabled={!email || !password}>
                Login
              </Button>
            </form>

            {/* FOOTER */}
            <div className="card-footer">
              <p>
                Don’t have an account?{" "}
                <span
                  className="link-blue bold"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
