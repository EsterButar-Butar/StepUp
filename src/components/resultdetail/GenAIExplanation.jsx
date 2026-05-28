import React from "react";
import "../../styles/detailresult/genaiexplanation.css";

export default function GenAIExplanation({ explanation }) {
  if (!explanation) return null;

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
        <p className="genai-text">{explanation}</p>
      </div>
    </section>
  );
}
