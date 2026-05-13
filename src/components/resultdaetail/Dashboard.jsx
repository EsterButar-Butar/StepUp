import React from "react";
import { FiArrowLeft } from "react-icons/fi"; // Menggunakan react-icons
import CareerHeader from "./CareerHeader";
import MatchBreakdown from "./MatchBreakdown";
import SkillGap from "./SkillGap";
import LearningPath from "./LearningPath";
import IndustryBenchmark from "./IndustryBenchmark";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Navbar diimpor di App.js atau layout utama, di sini kita fokus ke konten */}
      
      <main className="dashboard-content">
        <div className="container">
          
          {/* Breadcrumb Section */}
          <section className="breadcrumb-section">
            <button className="btn-back">
              <FiArrowLeft /> Back to Results
            </button>
          </section>

          {/* Header Section */}
          <section className="header-section">
            <CareerHeader />
          </section>

          {/* Analysis Grid: Breakdown & Skill Gap */}
          <section className="analysis-grid">
            <MatchBreakdown />
            <SkillGap />
          </section>

          {/* Insights Grid: Learning Path & Benchmark */}
          <section className="insights-grid">
            <LearningPath />
            <IndustryBenchmark />
          </section>

        </div>
      </main>

      {/* Footer diimpor di App.js atau layout utama */}
    </div>
  );
}