import {
  FiMail,
  FiBookOpen,
  FiClipboard,
  FiTrendingUp,
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
      {/* LEFT */}
      <div className="profile-user-section">
        {/* AVATAR */}
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {profileImage ? <img src={profileImage} alt="Profile" /> : null}
          </div>
        </div>

        {/* USER INFO */}
        <div className="profile-user-info">
          <div className="profile-top-row">
            <div>
              {displayName ? <h1>{displayName}</h1> : null}
              {user?.role ? <p className="profile-role">{user.role}</p> : null}
              <span className="profile-badge">StepUp Member</span>
            </div>
          </div>

          {/* META */}
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

          {/* ABOUT */}
          {user?.bio ? (
            <div className="profile-about">
              <h4>About</h4>
              <p>{user.bio}</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* RIGHT STATS */}
      <div className="profile-stats">
        {/* CARD 1 */}
        <div className="profile-stat-card">
          <div className="stat-icon purple">
            <FiClipboard />
          </div>

          <div className="stat-content">
            <h2>{assessmentSummary?.completedAssessments ?? 0}</h2>
            <p>Assessments Complete</p>
          </div>
        </div>

        {/* CARD 2 - Highest Score */}
        <div className="profile-stat-card">
          <div className="stat-icon green">
            <FiTrendingUp />
          </div>

          <div className="stat-content">
            <h2>
              {assessmentSummary?.highestScore ??
                assessmentSummary?.topScore ??
                "-"}
            </h2>
            <p>Highest Score</p>
          </div>
        </div>

        {/* CARD 3 (optional average/ATS) */}
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
