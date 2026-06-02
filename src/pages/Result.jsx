import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Navbar from "../components/NavbarResult";
import Footer from "../components/Footer";
import DashboardContent from "../components/result/DashboardContent";

import { getAssessmentResult } from "../api/resultApi";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import "../styles/result/result.css";

export default function Result() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const assessmentId =
    location.state?.assessmentId ||
    searchParams.get("id") ||
    localStorage.getItem("assessmentId") ||
    localStorage.getItem("latestAssessmentId");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (!assessmentId) {
          throw new Error("No assessment result selected yet.");
        }

        const data = await getAssessmentResult(assessmentId);

        setResult(data);
      } catch (error) {
        console.error(error);

        setError(error.message || "Failed to load career results");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [assessmentId]);

  const selectedCareerId =
    result?.career_recommendations?.[0]?.careerId || result?.assessmentId;

  useEffect(() => {
    if (selectedCareerId) {
      localStorage.setItem("selectedCareerId", selectedCareerId);
    }
  }, [selectedCareerId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (
    !result ||
    !result.career_recommendations ||
    result.career_recommendations.length === 0
  ) {
    return <ErrorState message="No career recommendations available yet." />;
  }

  return (
    <div className="result-page">
      <Navbar selectedCareerId={selectedCareerId} />

      <main className="result-main">
        <DashboardContent result={result} assessmentId={result.assessmentId} />
      </main>

      <Footer />
    </div>
  );
}
