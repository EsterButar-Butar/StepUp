import { CareerClarityHighlightsSection } from "./CareerClarityHighlightsSection";
import { CareerHeroSection } from "./CareerHeroSection";
import { DirectionCallToActionSection } from "./DirectionCallToActionSection";
import { ProcessStepsSection } from "./ProcessStepsSection";

const sections = [
  { id: "career-hero", Component: CareerHeroSection },
  { id: "process-steps", Component: ProcessStepsSection },
  {
    id: "career-clarity-highlights",
    Component: CareerClarityHighlightsSection,
  },
  { id: "direction-call-to-action", Component: DirectionCallToActionSection },
];

export const MainContent = () => {
  return (
    <main className="flex w-full flex-col items-center px-0 pb-0 pt-20 relative">
      {sections.map(({ id, Component }) => (
        <section key={id} className="w-full">
          <Component />
        </section>
      ))}
    </main>
  );
};

export default MainContent;
