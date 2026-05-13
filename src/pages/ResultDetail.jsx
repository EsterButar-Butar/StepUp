import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResultDetailContent from "../components/resultDetail/ResultDetailContent";
import { careerData } from "../data/careerData";
import { skillGapData } from "../../data/skillGapData";
import SkillGap from "./SkillGap";

export default function ResultDetail() {
  return (
    <div>
      <Navbar />
      <ResultDetailContent data={careerData} />
      <SkillGap data={skillGapData} />
      <Footer />
    </div>
  );
}
