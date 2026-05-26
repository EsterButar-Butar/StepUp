// src/components/resultdetail/TopMatches.jsx

import { FiTrendingUp, FiGlobe, FiMonitor, FiBookmark } from "react-icons/fi";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import "../../styles/detailresult/topmatches.css";

export default function TopMatches({ career = {} }) {
  console.log("DetailResult TopMatches career:", career);
  const tagGroups = [
    { items: career?.insights || [], Icon: FiTrendingUp },
    { items: career?.marketTags || [], Icon: FiGlobe },
    { items: career?.tags || [], Icon: FiMonitor },
  ];

  const tags = tagGroups.flatMap(({ items, Icon }) =>
    (items || []).map((t, i) => ({ text: t, Icon, key: `${t}-${i}` })),
  );
  return (
    <section className="topmatches">
      {/* LEFT */}
      <div className="topmatches-left">
        {/* TITLE */}
        <div className="title-row">
          <div className="career-icon">
            <FiMonitor />
          </div>

          <h1>{career?.title}</h1>

          <span className="top-badge">TOP MATCH</span>
        </div>

        {/* DESC */}
        <p className="career-description">{career?.description}</p>

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

        <button className="save-btn">
          <FiBookmark />
          Save Result
        </button>
      </div>
    </section>
  );
}
