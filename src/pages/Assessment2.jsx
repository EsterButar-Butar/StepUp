// src/pages/Assessment2.jsx

import { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarAssessment";
import AssessmentLayout from "../layouts/AssessmentLayout";
import AssessmentProgressHeader from "../components/assessment/AssessmentProgressHeader";
import SkillDropdown from "../components/assessmentselectskill/SkillDropdown";
import "../styles/assessment2.css";
import {
  categories,
  hardSkillsByCategory,
  softSkills,
} from "../data/skillsData";

export default function Assessment2() {
  const navigate = useNavigate();

  const parseStoredArray = (key) => {
    const saved = localStorage.getItem(key);

    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(error);

      return [];
    }
  };

  const [category, setCategory] = useState(() => {
    return localStorage.getItem("assessment2-category") || "technology";
  });

  const [selectedTechnicalSkills, setSelectedTechnicalSkills] = useState(() => {
    return parseStoredArray("assessment2-tech");
  });

  const [selectedSoftSkills, setSelectedSoftSkills] = useState(() => {
    return parseStoredArray("assessment2-soft");
  });

  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("assessment2-level");

    return savedLevel || "intermediate";
  });

  const [loading, setLoading] = useState(false);

  const technicalSkills = hardSkillsByCategory[category] || [];

  const handleContinue = async () => {
    try {
      setLoading(true);

      const payload = {
        category,
        technicalSkills: selectedTechnicalSkills,
        softSkills: selectedSoftSkills,
        level,
      };

      localStorage.setItem("assessmentStep2", JSON.stringify(payload));

      navigate("/assessment3");
    } catch (error) {
      console.error(error);

      alert("Failed to save assessment data");
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
    localStorage.setItem("assessment2-category", category);
  }, [category]);

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
    <div className="assessment-page">
      <Navbar />
      <AssessmentLayout currentStep={2}>
        {/* HEADER */}
        <div className="form-header">
          <AssessmentProgressHeader
            currentStep={2}
            totalSteps={3}
            progressPercentage={66}
          />

          <h1>Select your skills</h1>

          <p>
            Choose the technical and soft skills that best represent your
            expertise.
          </p>
        </div>

        {/* CATEGORY */}
        <div className="category-container motion-stagger">
          <label className="skill-label">Category</label>
          <div className="category-grid">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`category-btn ${category === item ? "active" : ""}`}
                onClick={() => {
                  setCategory(item);
                  setSelectedTechnicalSkills([]);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="category-helper-text">
            Changing the category will update the available{" "}
            <strong>Technical Skills</strong> below.
          </p>
        </div>

        {/* FORM BODY */}
        <div className="form-body motion-stagger">
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
    </div>
  );
}
