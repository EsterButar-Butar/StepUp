import React from "react";
import "../../styles/detailresult/genaiexplanation.css";

export default function GenAIExplanation({ explanation }) {
  const hasExplanation = Boolean(
    explanation || explanation === 0 || explanation === false,
  );

  const text = hasExplanation
    ? typeof explanation === "string"
      ? explanation
      : Array.isArray(explanation)
        ? explanation.join("\n\n")
        : explanation?.text ||
          explanation?.content ||
          JSON.stringify(explanation)
    : "AI-generated insights are not available right now. Please check back later for a richer explanation.";

  const paragraphs = String(text).split(/\n\n+/g);

  return (
    <section className="genai-card" aria-label="AI explanation">
      <header className="genai-header">
        <div className="genai-title">
          <div className="genai-icon" aria-hidden>
            🤖
          </div>
          <h3>GenAI Explanation</h3>
        </div>
        <div className="genai-badge">Step Up</div>
      </header>

      <div className="genai-body">
        {paragraphs.map((p, i) => (
          <p key={i} className="genai-text">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
