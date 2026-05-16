// src/pages/Profile.jsx

import { useEffect, useState } from "react";

import NavbarDashboard from "../components/NavbarResult";
import Footer from "../components/Footer";

import ProfileHeader from "../components/profile/ProfileHeader";
import AssessmentSummary from "../components/profile/AssessmentSummary";
import AssessmentProgress from "../components/profile/AssessmentProgress";
import RecentActivity from "../components/profile/RecentActivity";

import "../styles/profile/profile.css";

export default function Profile() {
  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // USER DATA
  const [profileData, setProfileData] = useState({
    profile: {
      fullName: "",
      major: "",
      university: "",
      email: "",
      profileImage: "",
    },

    stats: {
      assessmentsComplete: 0,
      resultsGenerated: 0,
      topMatchAverage: 0,
    },

    summary: {
      topInterest: "",
      preferredWorkStyle: "",
      careerGoal: "",
    },

    progress: {
      percentage: 0,
      personality: false,
      skills: false,
      experience: false,
    },

    activities: [],
  });

  // LOAD DATA
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // ===================================
        // FUTURE BACKEND API
        // ===================================
        // const response =
        // await axios.get("/profile");
        // setProfileData(response.data);

        // ===================================
        // TEMP LOCAL DATA
        // ===================================

        const assessment1 = JSON.parse(localStorage.getItem("assessment1"));

        const assessment2 = JSON.parse(localStorage.getItem("assessment2"));

        const assessment3 = JSON.parse(localStorage.getItem("assessment3"));

        // PROFILE DATA
        setProfileData({
          profile: {
            fullName: assessment1?.fullName || "Alex Morgan",

            major: assessment1?.major || "Computer Science",

            university: assessment1?.university || "Stanford University",

            email: assessment1?.email || "example@gmail.com",

            profileImage:
              assessment1?.profileImage || "https://i.pravatar.cc/300",
          },

          stats: {
            assessmentsComplete: 3,
            resultsGenerated: 2,
            topMatchAverage: 78,
          },

          summary: {
            topInterest: "Technology / Problem Solving",

            preferredWorkStyle: "Remote / Hybrid",

            careerGoal: "Frontend Engineer",
          },

          progress: {
            percentage: 75,

            personality: true,

            skills: true,

            experience: true,
          },

          activities: [
            {
              title: "Completed interest assessment",

              description: "Your assessment has been saved",

              date: "May 15, 2026",
            },

            {
              title: "Generated career result",

              description: "AI result generated successfully",

              date: "May 16, 2026",
            },

            {
              title: "Completed skills assessment",

              description: "Skills profile updated",

              date: "May 18, 2026",
            },
          ],
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // LOADING UI
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

  return (
    <div className="profile-page">
      {/* NAVBAR */}
      <NavbarDashboard />

      {/* MAIN */}
      <main className="profile-main">
        <div className="profile-container">
          {/* HEADER */}
          <ProfileHeader
            profile={profileData.profile}
            stats={profileData.stats}
          />

          {/* GRID */}
          <div className="profile-grid">
            {/* LEFT */}
            <div className="profile-left">
              <AssessmentSummary summary={profileData.summary} />
            </div>

            {/* RIGHT */}
            <div className="profile-right">
              <AssessmentProgress progress={profileData.progress} />

              <RecentActivity activities={profileData.activities} />
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
