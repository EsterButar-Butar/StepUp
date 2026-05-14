// src/components/profile/ProfileHeader.jsx

import { useRef } from "react";

import {
  FiMail,
  FiBookOpen,
  FiClipboard,
  FiTrendingUp,
  FiAward,
  FiCamera,
  FiEdit2,
  FiMapPin,
  FiPhone,
  FiGlobe,
} from "react-icons/fi";

import "../../styles/profile/profile-header.css";

export default function ProfileHeader({ profile, stats }) {
  const fileInputRef = useRef(null);

  // CHANGE PHOTO
  const handleChangePhoto = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // FUTURE BACKEND:
    // upload image API

    const imageUrl = URL.createObjectURL(file);

    localStorage.setItem("profile-preview-image", imageUrl);

    window.location.reload();
  };

  // OPEN FILE PICKER
  const handleOpenFilePicker = () => {
    fileInputRef.current.click();
  };

  // FALLBACK IMAGE
  const profileImage =
    localStorage.getItem("profile-preview-image") ||
    profile?.profileImage ||
    "https://i.pravatar.cc/300";

  return (
    <section className="profile-header-card">
      {/* LEFT */}
      <div className="profile-user-section">
        {/* AVATAR */}
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            <img src={profileImage} alt="Profile" />

            {/* EDIT BUTTON */}
            <button
              type="button"
              className="edit-profile-photo-btn"
              onClick={handleOpenFilePicker}
            >
              <FiCamera />
            </button>

            {/* HIDDEN INPUT */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleChangePhoto}
            />
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

            {/* EDIT PROFILE */}
            <button type="button" className="edit-profile-btn">
              <FiEdit2 />
              Edit Profile
            </button>
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

              <span>Indonesia</span>
            </div>

            <div className="profile-meta-item">
              <FiPhone />

              <span>+62xxxxxxxx</span>
            </div>

            <div className="profile-meta-item">
              <FiGlobe />

              <span>linkedin.com/in/profile</span>
            </div>
          </div>

          {/* ABOUT */}
          <div className="profile-about">
            <h4>About</h4>

            <p>
              Passionate technology learner focused on frontend engineering, AI
              systems, and digital product development.
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
