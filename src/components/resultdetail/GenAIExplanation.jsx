import React from "react";
import "../../styles/detailresult/genaiexplanation.css";

export default function GenAIExplanation({ explanation }) {
  if (!explanation) return null;

  const text =
    typeof explanation === "string"
      ? explanation
      : Array.isArray(explanation)
        ? explanation.join("\n\n")
        : explanation?.text ||
          explanation?.content ||
          JSON.stringify(explanation);

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
        <div className="genai-badge">Gemini</div>
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
