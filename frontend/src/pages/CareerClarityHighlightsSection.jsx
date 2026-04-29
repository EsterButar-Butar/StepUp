import container from "./container.svg";
import image from "./image.svg";
import vector2 from "./vector-2.svg";
import vector3 from "./vector-3.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";

const highlightCards = [
  {
    title: "Discover suitable paths",
    description: [
      "Uncover roles you might never have considered",
      "that perfectly align with your unique",
      "combination of skills and interests.",
    ],
    iconWrapperClass: "bg-blue-50",
    accentTextClass: "text-blue-600",
    iconType: "background",
    iconElement: (
      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
        <div className="relative w-5 h-5 bg-[url(/vector.svg)] bg-[100%_100%]" />
      </div>
    ),
    arrowSrc: image,
    arrowClass: "absolute w-[100.00%] h-[87.51%] top-[12.49%] left-0",
  },
  {
    title: "See match scores",
    description: [
      "Get quantitative confidence in your choices",
      "with percentage-based match scores analyzing",
      "exactly why a role fits you.",
    ],
    iconWrapperClass: "bg-indigo-50",
    accentTextClass: "text-indigo-600",
    iconType: "image",
    iconElement: (
      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
        <div className="relative w-[15px] h-5">
          <img
            className="absolute w-[100.02%] h-[87.51%] top-[12.49%] left-0"
            alt=""
            src={vector2}
          />
        </div>
      </div>
    ),
    arrowSrc: vector3,
    arrowClass: "absolute w-full h-[87.51%] top-[12.49%] left-0",
  },
  {
    title: "Identify skill gaps",
    description: [
      "Know exactly what you need to learn. We",
      "highlight the missing technical and soft skills",
      "between you and your dream role.",
    ],
    iconWrapperClass: "bg-orange-50",
    accentTextClass: "text-orange-600",
    iconType: "image",
    iconElement: (
      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
        <div className="relative w-[22.5px] h-5">
          <img
            className="absolute w-[94.44%] h-[100.00%] top-0 left-[5.56%]"
            alt=""
            src={vector4}
          />
        </div>
      </div>
    ),
    arrowSrc: vector5,
    arrowClass: "absolute w-full h-[87.51%] top-[12.49%] left-0",
  },
];

export const CareerClarityHighlightsSection = () => {
  return (
    <section
      className="flex flex-col items-start px-20 py-24 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-b [border-bottom-style:solid] border-[#e5e7eb80] [background:radial-gradient(50%_50%_at_56%_63%,rgba(122,149,255,0.15)_0%,rgba(122,149,255,0)_50%),radial-gradient(50%_50%_at_37%_68%,rgba(31,221,255,0.15)_0%,rgba(31,221,255,0)_50%),radial-gradient(50%_50%_at_68%_50%,rgba(255,219,222,0.1)_0%,rgba(255,219,222,0)_50%),linear-gradient(0deg,rgba(249,250,251,1)_0%,rgba(249,250,251,1)_100%)]"
      aria-labelledby="career-clarity-highlights-heading"
    >
      <div className="flex flex-col max-w-screen-xl items-start gap-12 px-8 py-0 relative w-full flex-[0_0_auto]">
        <div className="flex items-end justify-between relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col max-w-2xl items-start gap-4 relative flex-[0_0_auto]">
            <div className="inline-flex items-center px-3 py-1 relative flex-[0_0_auto] bg-blue-100 rounded-full">
              <div className="flex items-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-blue-700 text-xs tracking-[0.60px] leading-4 whitespace-nowrap relative w-fit mt-[-1.00px]">
                PLATFORM BENEFITS
              </div>
            </div>
            <h2
              id="career-clarity-highlights-heading"
              className="items-center w-fit [font-family:'Inter-Bold',Helvetica] font-bold text-slate-900 text-4xl tracking-[0] leading-10 whitespace-nowrap relative flex"
            >
              Clarity for your career journey
            </h2>
          </div>
          <img
            className="relative flex-[0_0_auto] mb-[-9.00px] mr-[-5.00px]"
            alt=""
            src={container}
            aria-hidden="true"
          />
        </div>
        <div className="grid grid-cols-3 grid-rows-[298.25px] h-fit gap-8 w-full">
          {highlightCards.map((card, index) => (
            <article
              key={card.title}
              className={`col-[${index + 1}_/_${index + 2}] relative row-[1_/_2] w-full h-fit flex flex-col items-start gap-[10.8px] p-8 bg-white rounded-2xl border border-solid border-gray-100`}
            >
              <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-2xl shadow-[0px_10px_30px_-5px_#0f172a14]" />
              <div
                className={`flex w-14 h-14 items-center justify-center relative ${card.iconWrapperClass} rounded-xl`}
                aria-hidden="true"
              >
                {card.iconElement}
              </div>
              <div className="flex flex-col items-start pt-[13.2px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <h3 className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-slate-900 text-xl tracking-[0] leading-7">
                  {card.title}
                </h3>
              </div>
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-500 text-sm tracking-[0] leading-[22.8px]">
                  {card.description.map((line, lineIndex) => (
                    <span key={`${card.title}-line-${lineIndex}`}>
                      {line}
                      {lineIndex < card.description.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex flex-col items-start pt-[13.2px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <button
                  type="button"
                  className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto] text-left"
                  aria-label={`Learn more about ${card.title}`}
                >
                  <span
                    className={`flex items-center [font-family:'Inter-Medium',Helvetica] font-medium ${card.accentTextClass} text-sm tracking-[0] leading-5 whitespace-nowrap relative w-fit mt-[-1.00px]`}
                  >
                    Learn more
                  </span>
                  <span
                    className="inline-flex flex-col items-start relative flex-[0_0_auto]"
                    aria-hidden="true"
                  >
                    <span className="relative w-[10.5px] h-3">
                      <img
                        className={card.arrowClass}
                        alt=""
                        src={card.arrowSrc}
                      />
                    </span>
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
