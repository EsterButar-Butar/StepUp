// src/pages/Assessment.jsx

import { useState, useEffect } from "react";
import Navbar from "../components/NavbarAssessment";
import Footer from "../components/Footer";
import AssessmentSidebar from "../components/AssessmentSidebar";
import AssessmentProgressHeader from "../components/assessment/AssessmentProgressHeader";
import ImageCropModal from "../components/assessmentcrop/ImageCropModal";
import UploadPreview from "../components/assessmentcrop/UploadPreview";

import { FiChevronDown, FiArrowRight } from "react-icons/fi";

import "../styles/assessment.css";

import { useNavigate } from "react-router-dom";

export default function Assessment() {
  const navigate = useNavigate();

  const parseStoredStep1 = () => {
    const savedData = localStorage.getItem("assessmentStep1");

    if (!savedData) return null;

    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  const [formData, setFormData] = useState(() => {
    const savedData = parseStoredStep1();

    return savedData
      ? savedData
      : {
          fullName: "",
          location: "",
          email: "",
          phone: "",
          linkedin: "",
          university: "",
          major: "",
          semester: "",
          gpa: "",
          bio: "",
          careerGoal: "",
        };
  });

  const [previewImage, setPreviewImage] = useState(() => {
    return localStorage.getItem("assessmentProfileImage");
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormValid =
    [
      formData.fullName,
      formData.email,
      formData.university,
      formData.major,
    ].every((field) => field.trim() !== "");

  useEffect(() => {
    localStorage.setItem("assessmentStep1", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (previewImage) {
      localStorage.setItem("assessmentProfileImage", previewImage);
    }
  }, [previewImage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (
      !file.type.includes("png") &&
      !file.type.includes("jpg") &&
      !file.type.includes("jpeg")
    ) {
      alert("Only PNG, JPG, and JPEG files are allowed.");

      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 2MB.");

      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setTempImage(imageUrl);

    setShowCropModal(true);
  };

  const removeImage = () => {
    setPreviewImage(null);

    localStorage.removeItem("assessmentProfileImage");
  };

  const handleSaveCroppedImage = (croppedImage) => {
    setPreviewImage(croppedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert("Full name is required");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (formData.gpa) {
      const gpa = parseFloat(formData.gpa);

      if (Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
        alert("GPA must be between 0 and 4");
        return;
      }
    }

    try {
      setLoading(true);

      const step1Data = {
        ...formData,
        profileImage: previewImage,
      };

      localStorage.setItem("assessmentStep1", JSON.stringify(step1Data));

      navigate("/assessment2");
    } catch (error) {
      console.error(error);

      alert("Failed to save assessment data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assessment-page">
      <Navbar />

      <main className="assessment-main">
        <div className="assessment-card">
          {/* SIDEBAR */}
          <AssessmentSidebar currentStep={1} />

          {/* FORM CONTENT */}
          <section className="form-content">
            {/* HEADER */}
            <div className="assessment-header form-header">
              <AssessmentProgressHeader
                currentStep={1}
                totalSteps={3}
                progressPercentage={33}
              />

              <h1>Personal Information</h1>

              <p>Tell us about yourself to personalize your career insights.</p>
            </div>

            <form onSubmit={handleSubmit} className="motion-stagger">
              <div className="top-section">
                <div className="top-left">
                  <div className="input-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Example Form"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-field">
                    <label>Location</label>

                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. City, Country"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <UploadPreview
                  previewImage={previewImage}
                  onUpload={handleImageUpload}
                  onRemove={removeImage}
                />
              </div>

              <div className="input-row">
                <div className="input-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-field">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. +62xxxxxxx"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* LINKEDIN */}
              <div className="input-field">
                <label>LinkedIn / Portfolio URL</label>

                <input
                  type="text"
                  name="linkedin"
                  placeholder="e.g. https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>

              {/* UNIVERSITY & MAJOR */}
              <div className="input-row">
                <div className="input-field">
                  <label>University / Institution</label>

                  <input
                    type="text"
                    name="university"
                    placeholder="e.g. Stanford University"
                    value={formData.university}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-field">
                  <label>Major / Field of Study</label>

                  <input
                    type="text"
                    name="major"
                    placeholder="e.g. Computer Science"
                    value={formData.major}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* SEMESTER & GPA */}
              <div className="input-row">
                <div className="input-field">
                  <label>Current Semester / Year</label>

                  <div className="select-wrapper">
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                    >
                      <option value="">Select year</option>

                      <option>Semester 1</option>
                      <option>Semester 2</option>
                      <option>Semester 3</option>
                      <option>Semester 4</option>
                      <option>Semester 5</option>
                      <option>Semester 6</option>
                      <option>Semester 7</option>
                      <option>Semester 8</option>
                    </select>

                    <FiChevronDown className="select-icon" />
                  </div>
                </div>

                <div className="input-field">
                  <label>GPA (Optional)</label>

                  <input
                    type="text"
                    name="gpa"
                    placeholder="e.g. 3.8"
                    value={formData.gpa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* BIO */}
              <div className="input-field">
                <label>Short Bio / About Yourself</label>

                <textarea
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  rows="5"
                  maxLength={300}
                />

                <div className="textarea-footer">{formData.bio.length}/300</div>
              </div>

              {/* CAREER GOAL */}
              <div className="input-field">
                <label>Career Goal</label>

                <textarea
                  name="careerGoal"
                  placeholder="Describe your dream career or future goals..."
                  value={formData.careerGoal}
                  onChange={handleChange}
                  rows="4"
                  maxLength={300}
                />

                <div className="textarea-footer">
                  {formData.careerGoal.length}/300
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn-continue"
                disabled={!isFormValid || loading}
              >
                {loading ? "Saving..." : "Continue"}
                <FiArrowRight />
              </button>
            </form>
          </section>
        </div>
        {showCropModal && (
          <ImageCropModal
            image={tempImage}
            onClose={() => setShowCropModal(false)}
            onSave={handleSaveCroppedImage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
