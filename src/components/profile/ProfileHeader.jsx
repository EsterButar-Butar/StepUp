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

export default function ProfileHeader({ profile = {}, stats = {} }) {
  // BACKEND IMAGE
  const profileImage =
    profile?.profileImage ||
    `https://api.dicebear.com/7.x/personas/svg?seed=${profile?.fullName}`;

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
              <h1>{profile?.fullName || "Alex Morgan"}</h1>

              <p className="profile-major">
                {profile?.major || "Computer Science"}
              </p>
            </div>
          </div>

          {/* BADGE */}
          <span className="profile-badge">StepUp Member</span>

          {/* META */}
          <div className="profile-meta">
            <div className="profile-meta-item">
              <FiMail />

              <span>{profile?.email || "example@gmail.com"}</span>
            </div>

            <div className="profile-meta-item">
              <FiBookOpen />

              <span>{profile?.university || "Stanford University"}</span>
            </div>

            <div className="profile-meta-item">
              <FiMapPin />

              <span>{profile?.location || "Indonesia"}</span>
            </div>

            <div className="profile-meta-item">
              <FiPhone />

              <span>{profile?.phone || "+62xxxxxxxx"}</span>
            </div>

            <div className="profile-meta-item">
              <FiGlobe />

              <span>{profile?.linkedin || "linkedin.com/in/profile"}</span>
            </div>
          </div>

          {/* ABOUT */}
          <div className="profile-about">
            <h4>About</h4>

            <p>
              {profile?.bio ||
                "Passionate technology learner focused on frontend engineering, AI systems, and digital product development."}
            </p>
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
            <h2>{stats?.assessmentsComplete || 0}</h2>

            <p>Assessment Complete</p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="profile-stat-card">
          <div className="stat-icon green">
            <FiTrendingUp />
          </div>

          <div className="stat-content">
            <h2>{stats?.resultsGenerated || 0}</h2>

            <p>Result Generated</p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="profile-stat-card">
          <div className="stat-icon yellow">
            <FiAward />
          </div>

          <div className="stat-content">
            <h2>{stats?.topMatchAverage || 0}%</h2>

            <p>Top Match Average</p>
          </div>
        </div>
      </div>
    </section>
  );
}
