// src/components/resultdetail/TopMatches.jsx

import { FiTrendingUp, FiGlobe, FiMonitor, FiBookmark } from "react-icons/fi";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import GenAIExplanation from "./GenAIExplanation";
import "../../styles/detailresult/topmatches.css";

export default function TopMatches({ career = {}, explanation }) {
  console.log("DetailResult TopMatches career:", career);
  const tagGroups = [
    { items: career?.insights || [], Icon: FiTrendingUp },
    { items: career?.marketTags || [], Icon: FiGlobe },
    { items: career?.tags || [], Icon: FiMonitor },
  ];

  const tags = tagGroups.flatMap(({ items, Icon }) =>
    (items || []).map((t, i) => ({ text: t, Icon, key: `${t}-${i}` })),
  );

  const careerDescription =
    career?.description ||
    "A concise career summary is not available. Explore AI insights for the latest guidance.";

  return (
    <section className="topmatches">
      {/* LEFT */}
      <div className="topmatches-left">
        {/* TITLE */}
        <div className="title-row">
          <div className="career-icon">
            <FiMonitor />
          </div>

          <h1>{career?.title || "Career Recommendation"}</h1>

          <span className="top-badge">TOP MATCH</span>
        </div>

        {/* DESC */}
        <p className="career-description">{careerDescription}</p>

        {/* TAGS (dynamic from backend) */}
        {tags.length > 0 && (
          <div className="career-tags">
            {tags.map(({ text, Icon, key }) => (
              <div className="career-tag" key={key}>
                <Icon />
                {text}
              </div>
            ))}
          </div>
        )}

        <GenAIExplanation explanation={explanation} />
      </div>

      {/* RIGHT */}
      <div className="match-card">
        <div className="match-score-wrapper">
          <CircularProgressbar
            value={career?.matchScore || 0}
            text={`${career?.matchScore || 0}%`}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: "#2563eb",
              trailColor: "#dbeafe",
              textColor: "#0f172a",
              textSize: "16px",
            })}
          />
        </div>

        <p className="overall-text">OVERALL MATCH</p>

        <button
          className="save-btn"
          onClick={() => alert("The result has been saved!")}
        >
          <FiBookmark />
          Save Result
        </button>
      </div>
    </section>
  );
}
