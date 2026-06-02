import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { HiShieldCheck } from "react-icons/hi2";
import { checkAnalysisStatus } from "../api/analysisApi";
import ErrorState from "../components/ErrorState";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/analyzing.css";

const Analyzing = () => {
  const navigate = useNavigate();

  const messages = [
    "Parsing academic records and skills...",
    "Analyzing your strengths...",
    "Matching career paths...",
    "Finalizing your results...",
  ];

  const [step, setStep] = useState(0);

  const [error, setError] = useState(false);

  if (error) {
    return <ErrorState message="Failed to analyze profile" />;
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await checkAnalysisStatus();

        if (data.status === "completed") {
          clearInterval(interval);

          navigate("/result");
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    if (step < messages.length - 1) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, messages.length]);

  return (
    <div className="analyzing-page">
      <main className="analyzing-main">
        <div className="analyzing-card">
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-icon">
              {/* Pakai React Icon GiBrain */}
              <GiBrain size={32} color="#2563eb" />
            </div>
          </div>

          <h2>Analyzing your profile...</h2>

          <p className="status">{messages[step]}</p>

          <div className="divider"></div>

          <div className="privacy">
            {/* Pakai React Icon HiShieldCheck */}
            <HiShieldCheck size={20} color="#3b82f6" />
            <p>Your data is securely encrypted and private.</p>
          </div>

          <small>This usually takes about 15–30 seconds.</small>
        </div>
      </main>
    </div>
  );
};

export default Analyzing;
