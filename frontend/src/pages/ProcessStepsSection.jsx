import vector8 from "./vector-8.svg";

const steps = [
  {
    id: 1,
    title: "Build Profile",
    description: [
      "Enter your academic background, skills, and",
      "interests into our structured assessment.",
    ],
    icon: (
      <div className="relative w-[27px] h-6">
        <img
          className="absolute w-full h-[93.75%] top-[6.25%] left-0"
          alt=""
          src={vector8}
          aria-hidden="true"
        />
      </div>
    ),
    iconWrapperClassName:
      "flex w-20 h-20 items-center justify-center relative bg-blue-50 rounded-2xl border border-solid border-blue-100 shadow-[0px_1px_2px_#0000000d]",
  },
  {
    id: 2,
    title: "AI Analysis",
    description: [
      "Our engine cross-references your profile with",
      "thousands of career trajectories and market data.",
    ],
    icon: (
      <div
        className="relative w-6 h-6 bg-[url(/vector-9.svg)] bg-[100%_100%]"
        aria-hidden="true"
      />
    ),
    iconWrapperClassName:
      "bg-indigo-50 border-indigo-100 flex w-20 h-20 items-center justify-center relative rounded-2xl border border-solid shadow-[0px_1px_2px_#0000000d]",
  },
  {
    id: 3,
    title: "Get Recommendations",
    description: [
      "Receive detailed career matches, skill gap",
      "analysis, and a personalized roadmap.",
    ],
    icon: (
      <div
        className="relative w-[27px] h-[23.65px] bg-[url(/vector-10.svg)] bg-[100%_100%]"
        aria-hidden="true"
      />
    ),
    iconWrapperClassName:
      "bg-green-50 border-green-100 flex w-20 h-20 items-center justify-center relative rounded-2xl border border-solid shadow-[0px_1px_2px_#0000000d]",
  },
];

export const ProcessStepsSection = () => {
  return (
    <section
      className="flex flex-col items-start p-20 relative self-stretch w-full flex-[0_0_auto] bg-white"
      aria-labelledby="process-steps-heading"
    >
      <div className="flex flex-col max-w-screen-xl items-start gap-16 px-8 py-0 relative w-full flex-[0_0_auto]">
        <header className="flex flex-col items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <h2
              id="process-steps-heading"
              className="flex items-center justify-center [font-family:'Inter-Bold',Helvetica] font-bold text-slate-900 text-4xl text-center tracking-[0] leading-10 whitespace-nowrap relative w-fit mt-[-1.00px]"
            >
              How StepUp Works
            </h2>
          </div>
          <div className="flex flex-col max-w-2xl w-[672px] items-center relative flex-[0_0_auto]">
            <p className="flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-gray-500 text-base text-center tracking-[0] leading-6 whitespace-nowrap relative w-fit mt-[-1.00px]">
              Three simple steps to uncover your ideal career trajectory.
            </p>
          </div>
        </header>
        <ol className="relative grid grid-cols-3 grid-rows-[237.50px] h-fit gap-8 list-none p-0 m-0 w-full">
          <div
            className="absolute w-[68.00%] top-12 left-[16.00%] h-0.5 bg-gray-100"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`col-[${index + 1}_/_${index + 2}] relative row-[1_/_2] w-full h-fit flex flex-col items-center gap-[10.9px] p-6 bg-white rounded-2xl`}
            >
              <div className={step.iconWrapperClassName}>
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  {step.icon}
                </div>
                <div className="flex w-8 h-8 items-center justify-center pt-[5.5px] pb-[6.5px] px-0 absolute top-[-11px] right-[-11px] bg-white rounded-full border-2 border-solid border-gray-100">
                  <div className="relative flex items-center justify-center w-fit [font-family:'Inter-Bold',Helvetica] font-bold text-gray-400 text-xs text-center tracking-[0] leading-4 whitespace-nowrap">
                    {step.id}
                  </div>
                </div>
              </div>
              <div className="pt-[13.1px] pb-0 px-0 flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                <h3 className="flex items-center justify-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-slate-900 text-xl text-center tracking-[0] leading-7 whitespace-nowrap relative w-fit mt-[-1.00px]">
                  {step.title}
                </h3>
              </div>
              <div className="flex flex-col items-center pt-0 pb-[0.62px] px-0 relative self-stretch w-full flex-[0_0_auto]">
                <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-gray-500 text-sm text-center tracking-[0] leading-[22.8px] relative w-fit mt-[-1.00px]">
                  {step.description[0]}
                  <br />
                  {step.description[1]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
