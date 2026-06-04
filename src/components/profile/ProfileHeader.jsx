import {
  FiMail,
  FiBookOpen,
  FiClipboard,
  FiAward,
  FiMapPin,
  FiPhone,
  FiGlobe,
} from "react-icons/fi";

import "../../styles/profile/profile-header.css";
import { getProfileImageWithFallback } from "../../utils/profileImage";

export default function ProfileHeader({ user = {}, assessmentSummary = {} }) {
  const displayName = user?.name || user?.fullName || "";
  const email = user?.email || "";

  const profileImage = getProfileImageWithFallback(user, displayName || email);

  return (
    <section className="profile-header-card">
      <div className="profile-user-section">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {profileImage ? <img src={profileImage} alt="Profile" /> : null}
          </div>
        </div>

        <div className="profile-user-info">
          <div className="profile-top-row">
            <div>
              {displayName ? <h1>{displayName}</h1> : null}
              {user?.role ? <p className="profile-role">{user.role}</p> : null}
              <span className="profile-badge">StepUp Member</span>
            </div>
          </div>

          <div className="profile-meta">
            {email ? (
              <div className="profile-meta-item">
                <FiMail />
                <span>{email}</span>
              </div>
            ) : null}

            {user?.university ? (
              <div className="profile-meta-item">
                <FiBookOpen />
                <span>{user.university}</span>
              </div>
            ) : null}

            {user?.location ? (
              <div className="profile-meta-item">
                <FiMapPin />
                <span>{user.location}</span>
              </div>
            ) : null}

            {user?.phone ? (
              <div className="profile-meta-item">
                <FiPhone />
                <span>{user.phone}</span>
              </div>
            ) : null}

            {user?.linkedin || user?.website ? (
              <div className="profile-meta-item">
                <FiGlobe />
                <span>{user.linkedin || user.website}</span>
              </div>
            ) : null}
          </div>

          {user?.bio ? (
            <div className="profile-about">
              <h4>About</h4>
              <p>{user.bio}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <div className="stat-icon purple">
            <FiClipboard />
          </div>

          <div className="stat-content">
            <h2>{assessmentSummary?.completedAssessments ?? 0}</h2>
            <p>Assessments Complete</p>
          </div>
        </div>

        {assessmentSummary?.averageScore || assessmentSummary?.atsScore ? (
          <div className="profile-stat-card">
            <div className="stat-icon yellow">
              <FiAward />
            </div>

            <div className="stat-content">
              <h2>
                {assessmentSummary?.averageScore
                  ? `${assessmentSummary.averageScore}%`
                  : `${assessmentSummary?.atsScore ?? 0}%`}
              </h2>

              <p>
                {assessmentSummary?.averageScore
                  ? "Average Score"
                  : "ATS Score"}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
