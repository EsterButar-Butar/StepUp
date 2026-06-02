import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavbarResult";
import Footer from "../components/Footer";
import TopMatches from "../components/resultdetail/TopMatches";
import MatchBreakdown from "../components/resultdetail/MatchBreakdown";
import SkillGapAnalysis from "../components/resultdetail/SkillGapAnalysis";
import useCareerDetail from "../hooks/detailResult";
import "../styles/detailresult/detailresult.css";

export default function DetailResult() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, loading, error } = useCareerDetail(id);
  const career = data?.career_recommendations?.[0] || null;
  const breakdown =
    data?.match_breakdown?.map((item, index) => ({
      id: `${item.label || "breakdown"}-${index}`,
      type: item.type || item.label?.toLowerCase().split(" ")[0],
      label: item.label || "",
      score: Number(item.score ?? item.value ?? 0),
      color: item.color || "#2563eb",
    })) || [];
  const normalizeSkills = (items = []) =>
    items.map((item, index) =>
      typeof item === "string"
        ? { id: `${item}-${index}`, name: item }
        : { id: item.id || `${item.name || "skill"}-${index}`, ...item },
    );
  const skills = {
    technical: {
      have: normalizeSkills(data?.skill_gap_detailed?.tech?.have),
      improve: normalizeSkills(data?.skill_gap_detailed?.tech?.improve),
      missing: normalizeSkills(data?.skill_gap_detailed?.tech?.missing),
    },
    soft: {
      have: normalizeSkills(data?.skill_gap_detailed?.soft?.have),
      improve: normalizeSkills(data?.skill_gap_detailed?.soft?.improve),
      missing: normalizeSkills(data?.skill_gap_detailed?.soft?.missing),
    },
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <p>Loading result detail...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <p>{error}</p>

        <button onClick={() => navigate("/result")}>Back to Results</button>
      </div>
    );
  }

  if (!data || !career) {
    return (
      <div className="detail-error">
        <p>No detail data found.</p>
        <button onClick={() => navigate("/result")}>Back to Results</button>
      </div>
    );
  }

  return (
    <div className="detail-result">
      <Navbar selectedCareerId={id} />

      <main className="detail-main">
        <div className="back-wrapper">
          <button className="back-btn" onClick={() => navigate("/result")}>
            ← Back to Results
          </button>
        </div>

        <TopMatches career={career} explanation={data?.genai_explanation} />

        <section className="detail-grid">
          <MatchBreakdown breakdown={breakdown} />

          <SkillGapAnalysis skills={skills} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
