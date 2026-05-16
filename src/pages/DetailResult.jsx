// src/pages/DetailResult.jsx

import Navbar from "../components/NavbarResult";
import { useNavigate } from "react-router-dom";

import TopMatches from "../components/resultdetail/TopMatches";
import MatchBreakdown from "../components/resultdetail/MatchBreakdown";
import SkillGapAnalysis from "../components/resultdetail/SkillGapAnalysis";

import { mockResultDetail } from "../data/mockDetailResult";

import "../styles/detailresult/detailresult.css";

export default function DetailResult() {
  const data = mockResultDetail;
  const navigate = useNavigate();

  return (
    <div className="detail-result">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="detail-main">
        {/* BACK */}
        <div className="back-wrapper">
          <button className="back-btn" onClick={() => navigate("/result")}>
            ← Back to Results
          </button>
        </div>

        {/* TOP CARD */}
        <TopMatches career={data} />

        {/* BOTTOM GRID */}
        <section className="detail-grid">
          {/* LEFT CARD */}
          <MatchBreakdown breakdown={data?.breakdown} />

          {/* RIGHT CARD */}
          <SkillGapAnalysis skills={data?.skillGap} />
        </section>
      </main>
    </div>
  );
}
