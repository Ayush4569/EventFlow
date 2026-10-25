"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const STEPS = [
  { step: 1, title: "Event Basics", subtitle: "Name & Date" },
  { step: 2, title: "Scope Details", subtitle: "Core Requirements" },
  { step: 3, title: "Preferences", subtitle: "Additional Needs" },
  { step: 4, title: "Review & Submit", subtitle: "Final Verification" },
];

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  onStepClick,
}: ProgressIndicatorProps) {
  return (
    <nav aria-label="Wizard Progress" className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 shadow-sm shadow-indigo-500/50"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>

        {STEPS.map((item) => {
          const isCompleted = item.step < currentStep;
          const isCurrent = item.step === currentStep;
          const isAccessible = item.step <= currentStep;

          return (
            <button
              key={item.step}
              type="button"
              disabled={!isAccessible}
              onClick={() => onStepClick(item.step)}
              className={`flex flex-col items-center group relative z-10 focus:outline-none transition-transform active:scale-95 ${
                isAccessible ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isCompleted
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 ring-4 ring-indigo-500/20"
                    : isCurrent
                    ? "bg-slate-900 border-2 border-indigo-400 text-indigo-300 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20"
                    : "bg-slate-900 border border-slate-700 text-slate-500 group-hover:border-slate-600 group-hover:text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>0{item.step}</span>
                )}
              </div>

              <div className="mt-2.5 text-center">
                <p
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    isCurrent
                      ? "text-indigo-400"
                      : isCompleted
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}
                >
                  {item.title}
                </p>
                <p className="hidden sm:block text-[11px] text-slate-500 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
