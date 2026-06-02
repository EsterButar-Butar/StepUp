import MatchCard from "./MatchCard.jsx";
import { Code2, PenTool, BarChart3 } from "lucide-react";
import "../../styles/result/topmatches.css";

export default function TopMatchesGrid({ data = [], assessmentId }) {
  const iconMap = {
    frontend: Code2,
    design: PenTool,
    product: BarChart3,
  };

  const getCareerId = (item) => item.careerId || item.id || item.slug;

  return (
    <section className="tm-grid-container">
      <div className="tm-matches-grid">
        {data.length === 0 ? (
          <p>No career recommendations available yet.</p>
        ) : (
          data.map((item, index) => (
            <MatchCard
              key={`${item.title || "career"}-${index}`}
              {...item}
              careerId={getCareerId(item)}
              career={item}
              Icon={iconMap[item.icon] || Code2}
            />
          ))
        )}
      </div>
    </section>
  );
}
