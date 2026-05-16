import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiUser, FiMail, FiLock } from "react-icons/fi";

import Logo from "../assets/S.png";
import ErrorMessage from "../components/ErrorMessage";
import RegisterInput from "../components/register/RegisterInput";
import RegisterButton from "../components/register/RegisterButton";
import Divider from "../components/register/Divider";
import GoogleButton from "../components/register/GoogleButton";

import { register } from "../services/authService";

import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await register(formData);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="su-page">
      <div className="su-container">
        <div className="su-branding-side">
          <div className="su-lg-wrapper">
            <div className="su-logo-row">
              <img src={Logo} alt="StepUp Logo" className="su-stepup-logo" />
            </div>

            <p className="su-branding-tagline">
              Elevate your journey to the next level
            </p>
          </div>
        </div>

        <div className="su-auth-side">
          <div className="su-auth-card">
            <header className="su-card-header">
              <h2>Sign Up</h2>

              <p>Create an account to continue</p>
            </header>

            <ErrorMessage message={error} />

            <form onSubmit={handleSignup} className="su-form">
              <RegisterInput
                label="FULL NAME"
                icon={<FiUser color="#2563eb" />}
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

              <RegisterInput
                label="EMAIL ADDRESS"
                icon={<FiMail color="#2563eb" />}
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
              />

              <RegisterInput
                label="PASSWORD"
                icon={<FiLock color="#2563eb" />}
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

              <RegisterButton loading={loading}>Sign Up</RegisterButton>
            </form>

            <Divider />

            <GoogleButton />

            <footer className="su-card-footer">
              <p>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")} className="su-link">
                  Sign in
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
