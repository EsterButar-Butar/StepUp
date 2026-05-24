import NavbarDashboard from "../components/NavbarResult";

import Footer from "../components/Footer";

import ProfileHeader from "../components/profile/ProfileHeader";

import AssessmentSummary from "../components/profile/AssessmentSummary";

import AssessmentProgress from "../components/profile/AssessmentProgress";

import RecentActivity from "../components/profile/RecentActivity";

import useProfile from "../hooks/profile";

import "../styles/profile/profile.css";

export default function Profile() {
  const { data, loading, error } = useProfile();

  // LOADING
  if (loading) {
    return (
      <div className="profile-loading-page">
        <NavbarDashboard />

        <div className="profile-loading-container">
          <div className="profile-loading-card">
            <div className="loading-spinner"></div>

            <h2>Loading your profile...</h2>

            <p>Preparing your personalized dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="profile-loading-page">
        <NavbarDashboard />

        <div className="profile-loading-container">
          <div className="profile-loading-card">
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY
  if (!data) {
    return (
      <div className="profile-loading-page">
        <NavbarDashboard />

        <div className="profile-loading-container">
          <div className="profile-loading-card">
            <h2>No profile data found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <NavbarDashboard />

      <main className="profile-main">
        <div className="profile-container">
          <ProfileHeader profile={data.profile} stats={data.stats} />

          <div className="profile-grid">
            <div className="profile-left">
              <AssessmentSummary summary={data.summary} />
            </div>

            <div className="profile-right">
              <AssessmentProgress progress={data.progress} />

              <RecentActivity activities={data.activities} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
