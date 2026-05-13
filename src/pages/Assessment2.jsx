// src/pages/Assessment2.jsx

import { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AssessmentLayout from "../layouts/AssessmentLayout";
import SkillDropdown from "../components/assessmentselectskill/SkillDropdown";
import { technicalSkills, softSkills } from "../data/skillsData";
import "../styles/assessment2.css";

export default function Assessment2() {
  const navigate = useNavigate();

  const [selectedTechnicalSkills, setSelectedTechnicalSkills] = useState(() => {
    const saved = localStorage.getItem("assessment2-tech");

    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSoftSkills, setSelectedSoftSkills] = useState(() => {
    const saved = localStorage.getItem("assessment2-soft");

    return saved ? JSON.parse(saved) : [];
  });

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("assessment2-level");

    return savedLevel || "intermediate";
  });

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    try {
      setLoading(true);

      // SIMULASI LOADING
      await new Promise((resolve) => setTimeout(resolve, 1200));

      navigate("/assessment3");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    selectedTechnicalSkills.length > 0 && selectedSoftSkills.length > 0;

  useEffect(() => {
    localStorage.setItem("assessment2-level", level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem(
      "assessment2-tech",
      JSON.stringify(selectedTechnicalSkills),
    );
  }, [selectedTechnicalSkills]);

  useEffect(() => {
    localStorage.setItem(
      "assessment2-soft",
      JSON.stringify(selectedSoftSkills),
    );
  }, [selectedSoftSkills]);

  return (
    <AssessmentLayout currentStep={2}>
      {/* HEADER */}
      <div className="form-header">
        <h1>Select your skills</h1>

        <p>
          Choose the technical and soft skills that best represent your
          expertise.
        </p>
      </div>

      {/* FORM BODY */}
      <div className="form-body">
        {/* TECHNICAL */}
        <SkillDropdown
          label="Technical Skills"
          skills={technicalSkills}
          selectedSkills={selectedTechnicalSkills}
          setSelectedSkills={setSelectedTechnicalSkills}
        />

        {/* SOFT */}
        <SkillDropdown
          label="Soft Skills"
          skills={softSkills}
          selectedSkills={selectedSoftSkills}
          setSelectedSkills={setSelectedSoftSkills}
        />

        {/* LEVEL */}
        <div className="experience-level-container">
          <label className="level-label">Overall Experience Level</label>

          <div className="level-options-card">
            <button
              type="button"
              className={`level-btn ${level === "beginner" ? "active" : ""}`}
              onClick={() => setLevel("beginner")}
            >
              Beginner
            </button>

            <button
              type="button"
              className={`level-btn ${
                level === "intermediate" ? "active" : ""
              }`}
              onClick={() => setLevel("intermediate")}
            >
              Intermediate
            </button>

            <button
              type="button"
              className={`level-btn ${level === "advanced" ? "active" : ""}`}
              onClick={() => setLevel("advanced")}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="foot-nav">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/assessment")}
          >
            <FiArrowLeft />
            Back
          </button>

          <button
            type="button"
            className="btn-continue"
            disabled={!isFormValid || loading}
            onClick={handleContinue}
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                Continue
                <FiArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </AssessmentLayout>
  );
}
