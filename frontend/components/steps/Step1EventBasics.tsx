"use client";

import { EventBasics, RequirementCategory } from "@/types/requirement";

interface Step1Props {
  data: EventBasics;
  category: RequirementCategory;
  errors: Record<string, string>;
  onChange: (field: keyof EventBasics, value: string) => void;
  onCategoryChange: (category: RequirementCategory) => void;
}

const EVENT_TYPES = [
  "Corporate Conference",
  "Wedding",
  "Music Concert / Festival",
  "Charity Gala",
  "Birthday / Private Party",
  "Exhibition / Trade Show",
  "Award Ceremony",
  "Other",
];

const CATEGORIES: {
  id: RequirementCategory;
  title: string;
  badge: string;
  description: string;
}[] = [
  {
    id: "planner",
    title: "Event Planner",
    badge: "Coordination & Management",
    description:
      "Full event planning, vendor orchestration, schedule management, and creative design.",
  },
  {
    id: "performer",
    title: "Performer",
    badge: "Stage & Entertainment",
    description:
      "Live bands, solo musicians, DJs, MCs, comedians, dancers, and featured acts.",
  },
  {
    id: "crew",
    title: "Event Crew",
    badge: "Operations & Technical",
    description:
      "Audio/visual technicians, lighting operators, stagehands, security, and coordinators.",
  },
];

export default function Step1EventBasics({
  data,
  category,
  errors,
  onChange,
  onCategoryChange,
}: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Step 1: Event Basics
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Specify fundamental information about your upcoming event and select the service role needed.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          Select Requirement Category <span className="text-rose-400">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-950/30 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10"
                    : "border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-sm">
                      {cat.title}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-500"
                          : "border-slate-700 bg-slate-800"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded-md mb-2">
                    {cat.badge}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors["category"] && (
          <p className="text-xs font-medium text-rose-400">
            {errors["category"]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="event-name"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Event Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="event-name"
            type="text"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Apex Tech Gala 2026"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
              errors["event.name"]
                ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
            }`}
          />
          {errors["event.name"] && (
            <p className="text-xs font-medium text-rose-400 mt-1">
              {errors["event.name"]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="event-type"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Event Type <span className="text-rose-400">*</span>
          </label>
          <select
            id="event-type"
            value={data.type}
            onChange={(e) => onChange("type", e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
              errors["event.type"]
                ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white"
            }`}
          >
            <option value="" className="bg-slate-900 text-slate-400">
              Select an event type...
            </option>
            {EVENT_TYPES.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-slate-900 text-white"
              >
                {type}
              </option>
            ))}
          </select>
          {errors["event.type"] && (
            <p className="text-xs font-medium text-rose-400 mt-1">
              {errors["event.type"]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Start Date <span className="text-rose-400">*</span>
          </label>
          <input
            id="start-date"
            type="date"
            value={data.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
              errors["event.startDate"]
                ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white"
            }`}
          />
          {errors["event.startDate"] && (
            <p className="text-xs font-medium text-rose-400 mt-1">
              {errors["event.startDate"]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            End Date <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            id="end-date"
            type="date"
            min={data.startDate || undefined}
            value={data.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
              errors["event.endDate"]
                ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white"
            }`}
          />
          {errors["event.endDate"] && (
            <p className="text-xs font-medium text-rose-400 mt-1">
              {errors["event.endDate"]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Location / City <span className="text-rose-400">*</span>
          </label>
          <input
            id="location"
            type="text"
            value={data.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
              errors["event.location"]
                ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
            }`}
          />
          {errors["event.location"] && (
            <p className="text-xs font-medium text-rose-400 mt-1">
              {errors["event.location"]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="venue"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Venue <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            id="venue"
            type="text"
            value={data.venue}
            onChange={(e) => onChange("venue", e.target.value)}
            placeholder="e.g. Moscone Center, Hall B"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>
    </div>
  );
}
