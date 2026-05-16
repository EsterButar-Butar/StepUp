import { useEffect, useState } from "react";

import Navbar from "../components/NavbarResult";
import Footer from "../components/Footer";
import DashboardContent from "../components/result/DashboardContent";

import { getAssessmentResult } from "../api/resultApi";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import "../styles/result/result.css";

export default function Result() {
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getAssessmentResult();

        setResult(data);
      } catch (error) {
        console.error(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message="Failed to load career results" />;
  }

  if (!result) {
    return <ErrorState message="No result found" />;
  }

  return (
    <div className="result-page">
      <Navbar />

      <main className="result-main">
        <DashboardContent result={result} />
      </main>

      <Footer />
    </div>
  );
}
