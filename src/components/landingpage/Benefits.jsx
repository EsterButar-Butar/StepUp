import "../../styles/landingpage/benefits.css";
import { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCompass,
  FiPercent,
  FiLayers,
  FiFileText,
} from "react-icons/fi";

export default function Benefits() {
  const benefitData = [
    {
      id: 1,
      title: "Discover suitable paths",
      desc: "Uncover roles you might never have considered that perfectly align with your unique combination of skills and interests.",
      icon: <FiCompass />,
      theme: "bn-blue",
    },
    {
      id: 2,
      title: "See match scores",
      desc: "Get quantitative confidence in your choices with percentage-based match scores analyzing exactly why a role fits you.",
      icon: <FiPercent />,
      theme: "bn-purple",
    },
    {
      id: 3,
      title: "Identify skill gaps",
      desc: "Know exactly what you need to learn. We highlight the missing technical and soft skills between you and your dream role.",
      icon: <FiLayers />,
      theme: "bn-orange",
    },
    {
      id: 4,
      title: "Generate Smart CV",
      desc: "Create an ATS-friendly CV automatically based on your assessment results and identified career path.",
      icon: <FiFileText />,
      theme: "bn-green",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < benefitData.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="bn-section">
      <div className="bn-container">
        <div className="bn-header-flex">
          <div className="bn-header-text">
            <span className="bn-badge">PLATFORM BENEFITS</span>

            <h2 className="bn-heading">Clarity for your career journey</h2>
          </div>

          <div className="bn-nav-controls">
            <button className="bn-nav-btn" onClick={prevSlide}>
              <FiArrowLeft />
            </button>

            <button className="bn-nav-btn" onClick={nextSlide}>
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="bn-slider-wrapper">
          <div
            className="bn-slider"
            style={{
              transform: `translateX(-${currentIndex * 33.33}%)`,
            }}
          >
            {benefitData.map((item) => (
              <div key={item.id} className="bn-card">
                <div className={`bn-icon-wrapper ${item.theme}`}>
                  {item.icon}
                </div>

                <h3 className="bn-card-title">{item.title}</h3>

                <p className="bn-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
