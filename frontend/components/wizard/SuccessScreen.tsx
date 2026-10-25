"use client";

import { useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const { event, category } = formData;

  const categoryLabels = {
    planner: "Event Planner",
    performer: "Performer",
    crew: "Event Crew",
  };

  const categoryBadges = {
    planner: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    performer: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    crew: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };

  const getBudgetText = () => {
    let budget: number | "" = "";
    if (category === "planner") budget = formData.plannerDetails.budget;
    else if (category === "performer") budget = formData.performerDetails.budget;
    else if (category === "crew") budget = formData.crewDetails.budget;

    if (typeof budget === "number" && budget > 0) {
      return `$${budget.toLocaleString()}`;
    }
    return "Open / Negotiable";
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(requirementId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = requirementId;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };



  const shortRef = requirementId.slice(-8).toUpperCase();

  return (
    <div className="py-6 px-2 sm:px-4 text-center space-y-6">
      <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-500/20">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>Requirement Live & Active</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Your Event Requirement is Published!
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Your event request has been broadcasted to verified professionals. Matching specialists will review your requirements and respond shortly.
        </p>
      </div>

      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/70 border border-slate-800/90 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Posting Reference:</span>
          <span className="font-mono text-emerald-400 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
            #{shortRef}
          </span>
          <span className="hidden sm:inline text-slate-500 text-[11px] font-mono">
            ({requirementId})
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyId}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
        >
          {copied ? (
              <span className="text-emerald-400">Reference Copied!</span>
          ) : (
              <span>Copy  Code</span>
          )}
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 text-left shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {event.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {event.type}
            </p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryBadges[category]}`}>
            {categoryLabels[category]}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Scheduled Date
            </span>
            <span className="text-white font-semibold block text-sm">
              {event.startDate}
              {event.endDate ? ` → ${event.endDate}` : ""}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location & Venue
            </span>
            <span className="text-white font-semibold block text-sm">
              {event.location}
              {event.venue ? ` • ${event.venue}` : ""}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Allocated Budget
            </span>
            <span className="text-emerald-400 font-bold block text-sm">
              {getBudgetText()}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Requirement Scope
            </span>
            <span className="text-indigo-300 font-semibold block text-sm">
              {category === "planner" && `${formData.plannerDetails.guestCount ? `${formData.plannerDetails.guestCount} guests` : "Flexible guest count"}`}
              {category === "performer" && `${formData.performerDetails.performanceType || "Performer required"}`}
              {category === "crew" && `${formData.crewDetails.role || "Crew member"}`}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-left flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          What to expect next
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs mb-2">
              1
            </div>
            <h4 className="text-white text-xs font-semibold">Instant Alert</h4>
            <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
              Verified specialists matching your location receive this request immediately.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5">
            <div className="w-6 h-6 rounded-lg bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-xs mb-2">
              2
            </div>
            <h4 className="text-white text-xs font-semibold">Review Quotes</h4>
            <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
              Compare custom proposals, portfolios, and rates as professionals reply.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs mb-2">
              3
            </div>
            <h4 className="text-white text-xs font-semibold">Secure Booking</h4>
            <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
              Message your top choice directly, coordinate timelines, and finalize hiring.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 cursor-pointer active:scale-98"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
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