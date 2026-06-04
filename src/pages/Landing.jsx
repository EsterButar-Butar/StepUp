import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/landingpage/Hero";
import HowItWorks from "../components/landingpage/HowItWorks";
import Benefits from "../components/landingpage/Benefits";
import Illustration from "../components/landingpage/Illustration";
import Footer from "../components/Footer";

export default function Landing() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (!section) return;
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }, [section]);

  return (
    <>
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <div id="features">
        <Benefits />
      </div>

      <div id="illustration">
        <Illustration />
      </div>

      <Footer />
    </>
  );
}
