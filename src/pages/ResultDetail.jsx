import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import CareerHeader from "../components/resultdetail/CareerHeader";
import MatchBreakdown from "../components/resultdetail/MatchBreakdown";
import SkillGap from "../components/resultdetail/SkillGap";
import LearningPath from "../components/resultdetail/LearningPath";
import IndustryBenchmark from "../components/resultdetail/IndustryBenchmark";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import useCareerDetail from "../hooks/detailResult";

import "../styles/resultdetail/resultdetail.css";

export default function ResultDetailPage() {
  const { id } = useParams();

  const { data, loading, error } = useCareerDetail(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="result-page">
      <Navbar />

      <main className="result-container">
        <CareerHeader career={data} />

        <div className="analysis-grid">
          <MatchBreakdown breakdown={data?.breakdown} />
          <SkillGap skills={data?.skillGap} />
        </div>

        <div className="insight-grid">
          <LearningPath courses={data.learningPath} />
          <IndustryBenchmark benchmark={data.benchmark} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
