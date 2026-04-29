import abstractAppPreviewInsideHero from "./abstract-app-preview-inside-hero.svg";
import vector7 from "./vector-7.svg";

export const CareerHeroSection = () => {
  return (
    <section
      className="flex flex-col max-w-screen-xl w-[1280px] items-start pt-24 pb-32 px-8 relative flex-[0_0_auto]"
      aria-labelledby="career-hero-heading"
    >
      <div className="flex flex-col items-center gap-32 pt-20 pb-4 px-20 relative self-stretch w-full flex-[0_0_auto] rounded-[32px] overflow-hidden shadow-[0px_25px_50px_-12px_#00000040] bg-[linear-gradient(148deg,rgba(30,58,138,1)_0%,rgba(59,130,246,1)_50%,rgba(99,102,241,1)_100%)]">
        <div
          className="absolute w-full h-full top-0 left-0 overflow-hidden opacity-30 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[32px] mix-blend-overlay opacity-50" />
          <div className="absolute right-0 bottom-0 w-[1216px] h-[476px] bg-[linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_100%)]" />
        </div>
        <div className="flex flex-col max-w-screen-md w-[768px] items-center gap-6 relative flex-[0_0_auto] z-[1]">
          <div className="inline-flex items-center gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[#ffffff1a] rounded-full border border-solid border-[#ffffff33] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
            <div
              className="relative w-2 h-2 bg-green-400 rounded-full"
              aria-hidden="true"
            />
            <p className="relative flex items-center justify-center w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-5 whitespace-nowrap">
              AI-Powered Career Guidance
            </p>
          </div>
          <div className="pt-2 pb-0 px-0 flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <h1
              id="career-hero-heading"
              className="[font-family:'Inter-Bold',Helvetica] font-bold text-white text-6xl text-center tracking-[-1.50px] leading-[60px] relative w-fit mt-[-1.00px]"
            >
              Discover your perfect
              <br />
              career path with AI
              <br />
              precision
            </h1>
          </div>
          <div className="flex flex-col max-w-2xl w-[672px] items-center relative flex-[0_0_auto]">
            <p className="[font-family:'Inter-Light',Helvetica] font-light text-blue-100 text-xl text-center tracking-[0] leading-7 relative w-fit mt-[-1.00px]">
              Stop guessing about your future. StepUp analyzes your skills,
              interests,
              <br />
              and experience to match you with career paths where you&apos;ll
              thrive.
            </p>
          </div>
          <div className="flex w-[754px] items-center justify-center gap-[120px] pt-4 pb-0 px-0 relative flex-[0_0_auto]">
            <img
              className="relative w-[727px] mt-[-13.00px] mb-[-16.00px] ml-[-147.39px]"
              alt="StepUp app preview"
              src={abstractAppPreviewInsideHero}
            />
            <button
              type="button"
              className="all-[unset] box-border inline-flex items-center justify-center gap-3 px-8 py-4 relative flex-[0_0_auto] mr-[-109.38px] bg-white rounded-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Start Analysis"
            >
              <div
                className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-full shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]"
                aria-hidden="true"
              />
              <span className="flex items-center justify-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-blue-600 text-base text-center tracking-[0] leading-6 whitespace-nowrap relative w-fit mt-[-1.00px]">
                Start Analysis
              </span>
              <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <span className="relative w-[18px] h-4">
                  <img
                    className="absolute w-full h-full top-0 left-0"
                    alt=""
                    src={vector7}
                    aria-hidden="true"
                  />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
