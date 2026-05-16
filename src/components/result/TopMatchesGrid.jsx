import MatchCard from "./MatchCard.jsx";
import { Code2, PenTool, BarChart3 } from "lucide-react";
import "../../styles/result/topmatches.css";

export default function TopMatchesGrid({ data = [] }) {
  const iconMap = {
    frontend: Code2,
    design: PenTool,
    product: BarChart3,
  };
  return (
    <section className="tm-grid-container">
      <div className="tm-matches-grid">
        {data.map((item, index) => (
          <MatchCard key={index} {...item} Icon={iconMap[item.icon] || Code2} />
        ))}
      </div>
    </section>
  );
}
