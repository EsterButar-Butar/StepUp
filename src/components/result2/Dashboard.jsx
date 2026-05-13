import React from "react";
import TopMatches from "./MatchCard";
import SkillGap from "../SkillGap.jsx";
import PromoCard from "./PromoCard";
import Footer from "../../components/Footer.jsx";

import { FiDownload, FiRefreshCcw } from "react-icons/fi";
import "../../styles/result2/promocard.css";

export default function Dashboard() {
  return (
    <div className="ds-page-wrapper">
      {/* Area Konten Utama */}
      <main className="ds-main-content">
        <div className="ds-container">
          {/* HEADER SECTION */}
          <header className="ds-header">
            <div className="ds-header-info">
              <h1 className="ds-title">Your Career Recommendations</h1>
              <p className="ds-subtitle">
                Based on your academic profile, skills, and interests.
              </p>
            </div>

            <div className="ds-header-actions">
              <button className="ds-btn ds-btn-outline">
                <FiDownload /> Export PDF
              </button>
              <button className="ds-btn ds-btn-primary">
                <FiRefreshCcw /> Run New Analysis
              </button>
            </div>
          </header>

          {/* DASHBOARD GRID */}
          <div className="ds-grid-layout">
            {/* Sisi Kiri: List Karir */}
            <section className="ds-content-primary">
              <h3 className="ds-section-label">Top Matches</h3>
              <TopMatches />
            </section>

            {/* Sisi Kanan (Sidebar): Analisis & Promo */}
            <aside className="ds-content-secondary">
              <h3 className="ds-section-label">Skill Gap Analysis</h3>
              <SkillGap showHeader={false} />
              <PromoCard />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
