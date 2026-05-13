// src/pages/Assessment3.jsx

import { useState } from "react";

import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import AssessmentLayout from "../layouts/AssessmentLayout";

import ProjectSection from "../components/assessment3/ProjectSection";
import InternshipSection from "../components/assessment3/InternshipSection";
import OrganizationSection from "../components/assessment3/OrganizationSection";
import CertificationSection from "../components/assessment3/CertificationSection";

import "../styles/assessment3.css";

export default function Assessment3() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([
    {
      projectName: "",
      role: "",
      issuesSolved: "",
      description: "",
    },
  ]);

  const isProjectValid = projects.some(
    (project) => project.projectName.trim() !== "",
  );

  return (
    <AssessmentLayout currentStep={3}>
      {/* HEADER */}
      <div className="form-header">
        <h1>Your Experience</h1>

        <p>
          Tell us more about your projects, internships, organizations, and
          certifications.
        </p>
      </div>

      {/* BODY */}
      <div className="form-body">
        <ProjectSection items={projects} setItems={setProjects} />

        <InternshipSection />

        <OrganizationSection />

        <CertificationSection />

        {/* ANALYSIS CARD */}
        <div className="analysis-ready-card">
          <h3>Your profile is ready for analysis</h3>

          <p>
            We will analyze your profile to generate personalized career
            insights and an ATS-ready CV.
          </p>

          <div className="analysis-points">
            <div className="analysis-item">✓ Career Recommendations</div>

            <div className="analysis-item">✓ Skills Analysis</div>

            <div className="analysis-item">✓ ATS-ready CV</div>

            <div className="analysis-item">✓ Strength Insights</div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="form-footer">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/assessment2")}
          >
            <FiArrowLeft />
            Back
          </button>

          <button
            disabled={!isProjectValid}
            onClick={() => navigate("/analyzing")}
            type="button"
            className="btn-submit"
          >
            Start AI Analysis
            <FiCheck />
          </button>
        </div>
      </div>
    </AssessmentLayout>
  );
}
