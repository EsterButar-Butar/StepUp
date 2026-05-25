// src/pages/Assessment3.jsx

import { useState, useEffect } from "react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { createAssessment } from "../services/assessmentService";
import AssessmentLayout from "../layouts/AssessmentLayout";
import AssessmentProgressHeader from "../components/assessment/AssessmentProgressHeader";
import ProjectSection from "../components/assessment3/ProjectSection";
import InternshipSection from "../components/assessment3/InternshipSection";
import OrganizationSection from "../components/assessment3/OrganizationSection";
import CertificationSection from "../components/assessment3/CertificationSection";

import "../styles/assessment3.css";

export default function Assessment3() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const parseStoredAssessment = (key) => {
    const value = localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const step1 = parseStoredAssessment("assessmentStep1");
      const step2 = parseStoredAssessment("assessmentStep2");

      if (!step1 || !step2) {
        throw new Error(
          "Assessment data is incomplete. Please review previous steps.",
        );
      }

      const normalizeAssessmentItems = (items) => {
        if (!Array.isArray(items)) return [];

        return items.filter((item) =>
          Object.values(item).some(
            (value) => String(value || "").trim() !== "",
          ),
        );
      };

      const experience = {
        projects: normalizeAssessmentItems(projects),
        internships: normalizeAssessmentItems(internships),
        organizations: normalizeAssessmentItems(organizations),
        certifications: normalizeAssessmentItems(certifications),
      };

      const fullAssessment = {
        personalInfo: {
          fullName: step1.fullName || "",
          email: step1.email || "",
          phone: step1.phone || "",
          linkedin: step1.linkedin || "",
          location: step1.location || "",
          bio: step1.bio || "",
          careerGoal: step1.careerGoal || "",
          avatarUrl: step1.profileImage || "",
        },
        education: {
          university: step1.university || "",
          major: step1.major || "",
          semester: step1.semester || "",
          gpa: step1.gpa ? Number(step1.gpa) : undefined,
        },
        skills: {
          hardSkills: step2.technicalSkills || [],
          softSkills: step2.softSkills || [],
          experienceLevel: step2.level || "intermediate",
        },
        experience,
      };

      const response = await createAssessment(fullAssessment);

      localStorage.setItem("latestAssessmentId", response.data.data._id);

      localStorage.removeItem("assessmentStep1");
      localStorage.removeItem("assessmentProfileImage");
      localStorage.removeItem("assessmentStep2");
      localStorage.removeItem("assessment2-category");
      localStorage.removeItem("assessment2-tech");
      localStorage.removeItem("assessment2-soft");
      localStorage.removeItem("assessment2-level");
      localStorage.removeItem("assessment3-projects");
      localStorage.removeItem("assessment3-internships");
      localStorage.removeItem("assessment3-organizations");
      localStorage.removeItem("assessment3-certifications");

      navigate("/analyzing");
    } catch (error) {
      console.error(error);

      alert(error.message || "Failed to submit assessment");
    } finally {
      setLoading(false);
    }
  };
  const [projects, setProjects] = useState(() => {
    return (
      parseStoredAssessment("assessment3-projects") || [
        {
          projectName: "",
          role: "",
          issuesSolved: "",
          description: "",
        },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("assessment3-projects", JSON.stringify(projects));
  }, [projects]);

  const [internships, setInternships] = useState(() => {
    return (
      parseStoredAssessment("assessment3-internships") || [
        {
          company: "",
          position: "",
          duration: "",
          responsibilities: "",
        },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "assessment3-internships",
      JSON.stringify(internships),
    );
  }, [internships]);

  const [organizations, setOrganizations] = useState(() => {
    return (
      parseStoredAssessment("assessment3-organizations") || [
        {
          organizationName: "",
          role: "",
          duration: "",
        },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "assessment3-organizations",
      JSON.stringify(organizations),
    );
  }, [organizations]);

  const [certifications, setCertifications] = useState(() => {
    return (
      parseStoredAssessment("assessment3-certifications") || [
        {
          certificateName: "",
          issuer: "",
          year: "",
        },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "assessment3-certifications",
      JSON.stringify(certifications),
    );
  }, [certifications]);

  return (
    <AssessmentLayout currentStep={3}>
      {/* HEADER */}
      <div className="form-header">
        <AssessmentProgressHeader
          currentStep={3}
          totalSteps={3}
          progressPercentage={100}
        />

        <h1>Your Experience</h1>

        <p>
          Tell us more about your projects, internships, organizations, and
          certifications.
        </p>
      </div>

      {/* BODY */}
      <div className="form-body motion-stagger">
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
            disabled={loading}
            onClick={handleSubmit}
            type="button"
            className="btn-submit"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                Start AI Analysis
                <FiCheck />
              </>
            )}
          </button>
        </div>
      </div>
    </AssessmentLayout>
  );
}
