"use client";

import { RequirementFormData } from "@/types/requirement";

interface SuccessScreenProps {
  requirementId: string;
  formData: RequirementFormData;
  onReset: () => void;
}

export default function SuccessScreen({
  requirementId,
  formData,
  onReset,
}: SuccessScreenProps) {
  const { event, category } = formData;

  const categoryLabels = {
    planner: "Event Planner",
    performer: "Performer",
    crew: "Event Crew",
  };

  return (
    <div className="py-8 px-4 sm:px-6 text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 ring-8 ring-emerald-500/10 shadow-lg shadow-emerald-500/20">
        <svg
          className="w-8 h-8"
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
      </div>

      <div className="space-y-2">
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
          MongoDB Verified Save
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Requirement Published Successfully
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Your event requirement is permanently stored in the database and ready for matching candidates.
        </p>
      </div>

      <div className="max-w-lg mx-auto bg-slate-950/70 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="font-semibold text-slate-400">Database Document ID:</span>
          <span className="font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 font-bold text-emerald-400 text-xs">
            {requirementId}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 pt-1">
          <div>
            <span className="text-slate-500 block font-medium">Event Name</span>
            <span className="text-white font-semibold text-sm">
              {event.name}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">Role Category</span>
            <span className="text-indigo-400 font-semibold text-sm">
              {categoryLabels[category]}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">Event Date</span>
            <span className="text-slate-200 font-medium">
              {event.startDate}
              {event.endDate ? ` → ${event.endDate}` : ""}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">Location</span>
            <span className="text-slate-200 font-medium">
              {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 cursor-pointer active:scale-98"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Post Another Requirement</span>
        </button>
      </div>
    </div>
  );
}
