import container2 from "./container-2.svg";
import vector6 from "./vector-6.svg";

export const DirectionCallToActionSection = () => {
  return (
    <section
      className="flex flex-col items-start px-28 py-24 relative self-stretch w-full flex-[0_0_auto] bg-white"
      aria-labelledby="direction-call-to-action-heading"
    >
      <div className="flex items-center justify-between p-16 relative self-stretch w-full flex-[0_0_auto] bg-slate-900 rounded-[40px] overflow-hidden shadow-[0px_25px_50px_-12px_#00000040]">
        <div
          className="absolute w-[50.00%] h-full top-0 left-[50.00%] bg-[linear-gradient(270deg,rgba(37,99,235,0.2)_0%,rgba(37,99,235,0)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#6366f14c] rounded-full blur-[32px]"
          aria-hidden="true"
        />
        <div className="flex flex-col items-start gap-6 relative flex-1 grow ml-[-1344px] z-10">
          <div className="flex-col items-start self-stretch w-full flex-[0_0_auto] relative flex">
            <h2
              id="direction-call-to-action-heading"
              className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-4xl tracking-[0] leading-10"
            >
              Ready to find your direction?
            </h2>
          </div>
          <div className="flex flex-col max-w-md w-[448px] items-start pt-0 pb-2 px-0 relative flex-[0_0_auto]">
            <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-gray-300 text-lg tracking-[0] leading-7 relative w-fit mt-[-1.00px]">
              Join thousands of students who have found clarity
              <br />
              and confidence in their career choices with StepUp.
            </p>
          </div>
          <button
            type="button"
            className="all-[unset] box-border inline-flex items-center gap-2 px-8 py-4 relative flex-[0_0_auto] bg-blue-500 rounded-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Begin Assessment"
          >
            <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-full shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]" />
            <div className="flex items-center justify-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap relative w-fit mt-[-1.00px]">
              Begin Assessment
            </div>
            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
              <div className="relative w-[12.25px] h-3.5">
                <img
                  className="absolute w-[100.00%] h-[87.51%] top-[12.49%] left-0"
                  alt=""
                  src={vector6}
                  aria-hidden="true"
                />
              </div>
            </div>
          </button>
        </div>
        <img
          className="relative flex-1 grow ml-[-1344px] z-10"
          alt="Illustration showing floating cards and interface elements"
          src={container2}
        />
      </div>
    </section>
  );
};
