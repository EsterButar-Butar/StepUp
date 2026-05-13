import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard from "../components/result2/Dashboard";
import SkillGap from "../components/SkillGap.jsx";

import "../styles/result2/dashboard.css";

export default function Result2() {
  return (
    <div className="result2-page">
      <Navbar />

      <main className="result2-layout">
        {/* LEFT */}
        <div className="left">
          <Dashboard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
