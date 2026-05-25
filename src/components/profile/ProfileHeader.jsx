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

export default function ProfileHeader({ user = {}, assessmentSummary = {} }) {
  const displayName = user?.name || user?.fullName || "User";
  const role = user?.role || user?.major || "StepUp Member";
  const email = user?.email || "Email not provided";
  const university = user?.university || "University not provided";
  const location = user?.location || "Location not provided";
  const phone = user?.phone || "Phone not provided";
  const linkedin =
    user?.linkedin || user?.website || "Profile link not provided";
  const bio = user?.bio || "No profile description available yet.";

  const profileImage =
    user?.profilePicture ||
    user?.profileImage ||
    `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
      displayName || email,
    )}`;

  return (
    <section className="profile-header-card">
      {/* LEFT */}
      <div className="profile-user-section">
        {/* AVATAR */}
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>

        {/* USER INFO */}
        <div className="profile-user-info">
          {/* TOP */}
          <div className="profile-top-row">
            <div>
              <h1>{displayName}</h1>

              <p className="profile-major">{role}</p>
            </div>
          </div>

          {/* BADGE */}
          <span className="profile-badge">{role}</span>

          {/* META */}
          <div className="profile-meta">
            <div className="profile-meta-item">
              <FiMail />

              <span>{email}</span>
            </div>

            <div className="profile-meta-item">
              <FiBookOpen />

              <span>{university}</span>
            </div>

            <div className="profile-meta-item">
              <FiMapPin />

              <span>{location}</span>
            </div>

            <div className="profile-meta-item">
              <FiPhone />

              <span>{phone}</span>
            </div>

            <div className="profile-meta-item">
              <FiGlobe />

              <span>{linkedin}</span>
            </div>
          </div>

          {/* ABOUT */}
          <div className="profile-about">
            <h4>About</h4>

            <p>{bio}</p>
          </div>
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

        {/* CARD 2 */}
        <div className="profile-stat-card">
          <div className="stat-icon green">
            <FiTrendingUp />
          </div>

          <div className="stat-content">
            <h2>{assessmentSummary?.topCareer || "-"}</h2>

            <p>Top Career</p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="profile-stat-card">
          <div className="stat-icon yellow">
            <FiAward />
          </div>

          <div className="stat-content">
            <h2>{assessmentSummary?.atsScore ?? 0}%</h2>

            <p>ATS Score</p>
          </div>
        </div>
      </div>
    </section>
  );
}
