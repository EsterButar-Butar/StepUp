import NavbarDashboard from "../components/NavbarResult";
import Footer from "../components/Footer";
import ErrorState from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileHeader from "../components/profile/ProfileHeader";
import AssessmentSummary from "../components/profile/AssessmentSummary";
import AssessmentProgress from "../components/profile/AssessmentProgress";
import RecentActivity from "../components/profile/RecentActivity";
import useProfile from "../hooks/profile";
import "../styles/profile/profile.css";

export default function Profile() {
  const { data, loading, error } = useProfile();
  const navbarUser = {
    fullName: data?.user?.name || data?.user?.fullName,
    major: data?.user?.role,
    profileImage: data?.user?.profilePicture || data?.user?.profileImage,
  };

  // LOADING
  if (loading) {
    return (
      <div className="profile-loading-page">
        <NavbarDashboard />

        <LoadingSpinner
          title="Loading your profile..."
          message="Preparing your personalized dashboard"
        />
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="profile-loading-page">
        <NavbarDashboard />

        <ErrorState message={error} />
      </div>
    );
  }

  console.log("profileData:", data);

  return (
    <div className="profile-page">
      <NavbarDashboard user={navbarUser} />

      <main className="profile-main">
        <div className="profile-container">
          <ProfileHeader
            user={data?.user}
            assessmentSummary={data?.assessmentSummary}
          />

          <div className="profile-grid">
            <div className="profile-left">
              <AssessmentSummary summary={data?.assessmentSummary} />
            </div>

            <div className="profile-right">
              <AssessmentProgress progress={data?.progress} />

              <RecentActivity activities={data?.recentActivities} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
