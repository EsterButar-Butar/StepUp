import { useEffect, useState } from "react";

import Navbar from "../components/NavbarResult";
import Footer from "../components/Footer";

import CVLayout from "../components/cv/CVLayout";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import { fetchCVResult } from "../services/cvService";

import "../styles/cvresult.css";

export default function CVResult() {
  const [cvData, setCvData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCV = async () => {
      try {
        const data = await fetchCVResult();

        console.log("CV backend response:", data);
        setCvData(data);
      } catch (error) {
        console.error(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCV();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message="Failed to load CV result" />;
  }

  if (!cvData) {
    return <ErrorState message="No CV data found" />;
  }

  return (
    <div className="cv-page">
      <Navbar />

      <main className="cv-main">
        <CVLayout data={cvData} />
      </main>

      <Footer />
    </div>
  );
}
