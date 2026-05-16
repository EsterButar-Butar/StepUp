// src/pages/Assessment3.jsx

import { useState, useEffect } from "react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import AssessmentLayout from "../layouts/AssessmentLayout";
import { submitAssessment3 } from "../api/assessment3Api";
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

  useEffect(() => {
    localStorage.setItem("assessment3-projects", JSON.stringify(projects));
  }, [projects]);

  const [internships, setInternships] = useState([
    {
      company: "",
      position: "",
      duration: "",
      responsibilities: "",
    },
  ]);

  useEffect(() => {
    localStorage.setItem(
      "assessment3-internships",
      JSON.stringify(internships),
    );
  }, [internships]);

  const [organizations, setOrganizations] = useState([
    {
      organizationName: "",
      role: "",
      duration: "",
    },
  ]);

  useEffect(() => {
    localStorage.setItem(
      "assessment3-organizations",
      JSON.stringify(organizations),
    );
  }, [organizations]);

  const [certifications, setCertifications] = useState([
    {
      certificateName: "",
      issuer: "",
      year: "",
    },
  ]);

  useEffect(() => {
    localStorage.setItem(
      "assessment3-certifications",
      JSON.stringify(certifications),
    );
  }, [certifications]);

  const isProjectValid = projects.some(
    (project) => project.projectName.trim() !== "",
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        projects,
        internships,
        organizations,
        certifications,
      };

      await submitAssessment3(payload);

      navigate("/analyzing");
    } catch (error) {
      console.error(error);

      alert("Failed to submit assessment");
    }
  };

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

        <InternshipSection items={internships} setItems={setInternships} />

        <OrganizationSection
          items={organizations}
          setItems={setOrganizations}
        />

        <CertificationSection
          items={certifications}
          setItems={setCertifications}
        />

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
            onClick={handleSubmit}
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
