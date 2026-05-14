import React from "react";
import { FiPlayCircle, FiClock, FiExternalLink } from "react-icons/fi";
import "../../styles/resultdetail/learningpath.css";

export default function LearningPath({ courses }) {
  // Data fallback jika props kosong
  const defaultCourses = [
    {
      id: 1,
      title: "AWS Cloud Practitioner Essentials",
      provider: "AWS",
      duration: "6 Hours",
      type: "Course",
    },
    {
      id: 2,
      title: "Docker for Beginners",
      provider: "Docker",
      duration: "4 Hours",
      type: "Course",
    },
    {
      id: 3,
      title: "Build a Full-Stack React App with CI/CD",
      provider: "Project-Based",
      duration: "12 Hours",
      type: "Project",
    },
  ];

  const displayCourses = courses || defaultCourses;

  return (
    <div className="lp-card">
      <div className="lp-header">
        <h3>Learning Path Recommendations</h3>
        <button className="lp-view-all">View All</button>
      </div>

      <div className="lp-list">
        {displayCourses.map((course) => (
          <div key={course.id} className="lp-item">
            <div className="lp-icon-box">
              {course.type === "Project" ? (
                <FiPlayCircle />
              ) : (
                <FiExternalLink />
              )}
            </div>

            <div className="lp-info">
              <h4 className="lp-title">{course.title}</h4>
              <p className="lp-subtitle">
                Fills your '{course.provider}' skill gap.
              </p>

              <div className="lp-meta">
                <span className="lp-duration">
                  <FiClock /> {course.duration}
                </span>
                <button className="lp-link">Start Learning →</button>
              </div>
            </div>

            {course.type === "Project" && (
              <span className="lp-badge">PROJECT</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
