import Navbar from "../components/NavbarAssessment";
import Footer from "../components/Footer";
import AssessmentSidebar from "../components/AssessmentSidebar";

export default function AssessmentLayout({ children, currentStep }) {
  return (
    <div className="assessment-page">
      <Navbar />

      <main className="assessment-main">
        <div className="assessment-card">
          <AssessmentSidebar currentStep={currentStep} />

          <section className="form-content">{children}</section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
