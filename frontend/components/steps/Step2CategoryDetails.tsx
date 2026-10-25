"use client";

import {
  RequirementCategory,
  PlannerDetails,
  PerformerDetails,
  CrewDetails,
} from "@/types/requirement";

interface Step2Props {
  category: RequirementCategory;
  plannerData: PlannerDetails;
  performerData: PerformerDetails;
  crewData: CrewDetails;
  errors: Record<string, string>;
  onPlannerChange: (
    field: keyof PlannerDetails,
    value: PlannerDetails[keyof PlannerDetails]
  ) => void;
  onPerformerChange: (
    field: keyof PerformerDetails,
    value: PerformerDetails[keyof PerformerDetails]
  ) => void;
  onCrewChange: (
    field: keyof CrewDetails,
    value: CrewDetails[keyof CrewDetails]
  ) => void;
}

const PLANNER_SERVICES = [
  "Full Planning & Production",
  "Day-of Coordination",
  "Vendor Management",
  "Decor & Aesthetic Design",
  "Catering & Menu Supervision",
  "Logistics & Run of Show",
  "Guest RSVP Management",
];

const PERFORMANCE_TYPES = [
  "Live Band (Full Ensemble)",
  "DJ & Music Producer",
  "Acoustic / Solo Musician",
  "Master of Ceremonies (MC)",
  "Magician / Illusionist",
  "Stand-up Comedian",
  "Dance Troupe / Performers",
  "Other Specialist Act",
];

const CREW_ROLES = [
  "Audio Engineer (FOH / Monitors)",
  "Lighting Board Operator",
  "Camera Operator / Videographer",
  "Stagehand / Rigging Support",
  "Stage Manager",
  "Broadcast / Streaming Tech",
  "Security / Access Control",
  "Usher / Front of House Host",
];

export default function Step2CategoryDetails({
  category,
  plannerData,
  performerData,
  crewData,
  errors,
  onPlannerChange,
  onPerformerChange,
  onCrewChange,
}: Step2Props) {
  const togglePlannerService = (service: string) => {
    const current = plannerData.servicesRequired || [];
    if (current.includes(service)) {
      onPlannerChange(
        "servicesRequired",
        current.filter((item) => item !== service)
      );
    } else {
      onPlannerChange("servicesRequired", [...current, service]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/70 border border-indigo-800/60 px-2.5 py-0.5 rounded-md">
            {category} Scope
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Step 2: Category-Specific Details
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {category === "planner" &&
            "Specify the guest count, coordination services needed, and budget for the event planner."}
          {category === "performer" &&
            "Detail the performance genre, number of performers, duration, and artist budget."}
          {category === "crew" &&
            "Define the crew role, team count, working shift duration, and operational budget."}
        </p>
      </div>

      {category === "planner" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="guest-count"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Estimated Guest Count / Scale{" "}
                <span className="text-rose-400">*</span>
              </label>
              <input
                id="guest-count"
                type="number"
                min="1"
                value={plannerData.guestCount}
                onChange={(e) =>
                  onPlannerChange(
                    "guestCount",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="e.g. 250"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.guestCount"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                }`}
              />
              {errors["categoryDetails.guestCount"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.guestCount"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="planner-budget"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Planner Budget (INR) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-semibold text-sm">
                  ₹
                </span>
                <input
                  id="planner-budget"
                  type="number"
                  min="1"
                  value={plannerData.budget}
                  onChange={(e) =>
                    onPlannerChange(
                      "budget",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="e.g. 5000"
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    errors["categoryDetails.budget"]
                      ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                  }`}
                />
              </div>
              {errors["categoryDetails.budget"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.budget"]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Services Required (Select at least one){" "}
              <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PLANNER_SERVICES.map((service) => {
                const isSelected = (
                  plannerData.servicesRequired || []
                ).includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => togglePlannerService(service)}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-950/50 text-indigo-200 ring-1 ring-indigo-500/40"
                        : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-500 text-white"
                          : "border-slate-700 bg-slate-800"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
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
                      )}
                    </span>
                    <span>{service}</span>
                  </button>
                );
              })}
            </div>
            {errors["categoryDetails.servicesRequired"] && (
              <p className="text-xs font-medium text-rose-400 mt-1.5">
                {errors["categoryDetails.servicesRequired"]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="planner-notes"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Notes & Special Instructions{" "}
              <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              id="planner-notes"
              rows={3}
              value={plannerData.notes}
              onChange={(e) => onPlannerChange("notes", e.target.value)}
              placeholder="Mention any specific vendor requirements, VIP expectations, or overall event vision..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}

      {category === "performer" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="performance-type"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Performance Type <span className="text-rose-400">*</span>
              </label>
              <select
                id="performance-type"
                value={performerData.performanceType}
                onChange={(e) =>
                  onPerformerChange("performanceType", e.target.value)
                }
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.performanceType"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white"
                }`}
              >
                <option value="" className="bg-slate-900 text-slate-400">
                  Select performance type...
                </option>
                {PERFORMANCE_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="bg-slate-900 text-white"
                  >
                    {type}
                  </option>
                ))}
              </select>
              {errors["categoryDetails.performanceType"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.performanceType"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="performer-count"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Number of Performers <span className="text-rose-400">*</span>
              </label>
              <input
                id="performer-count"
                type="number"
                min="1"
                value={performerData.performerCount}
                onChange={(e) =>
                  onPerformerChange(
                    "performerCount",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="e.g. 4"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.performerCount"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                }`}
              />
              {errors["categoryDetails.performerCount"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.performerCount"]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="performer-duration"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Performance Duration <span className="text-rose-400">*</span>
              </label>
              <input
                id="performer-duration"
                type="text"
                value={performerData.duration}
                onChange={(e) =>
                  onPerformerChange("duration", e.target.value)
                }
                placeholder="e.g. 2 hours (2 sets of 45 min)"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.duration"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                }`}
              />
              {errors["categoryDetails.duration"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.duration"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="performer-budget"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Performer Budget (USD) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-semibold text-sm">
                  $
                </span>
                <input
                  id="performer-budget"
                  type="number"
                  min="1"
                  value={performerData.budget}
                  onChange={(e) =>
                    onPerformerChange(
                      "budget",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="e.g. 3500"
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    errors["categoryDetails.budget"]
                      ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                  }`}
                />
              </div>
              {errors["categoryDetails.budget"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.budget"]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="performer-preferences"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Style / Genre Preferences <span className="text-rose-400">*</span>
            </label>
            <input
              id="performer-preferences"
              type="text"
              value={performerData.preferences}
              onChange={(e) =>
                onPerformerChange("preferences", e.target.value)
              }
              placeholder="e.g. Modern Jazz, Acoustic Pop, Top 40, Lounge"
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                errors["categoryDetails.preferences"]
                  ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
              }`}
            />
            {errors["categoryDetails.preferences"] && (
              <p className="text-xs font-medium text-rose-400 mt-1">
                {errors["categoryDetails.preferences"]}
              </p>
            )}
          </div>
        </div>
      )}

      {category === "crew" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="crew-role"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Required Crew Role <span className="text-rose-400">*</span>
              </label>
              <select
                id="crew-role"
                value={crewData.role}
                onChange={(e) => onCrewChange("role", e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.role"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white"
                }`}
              >
                <option value="" className="bg-slate-900 text-slate-400">
                  Select a crew role...
                </option>
                {CREW_ROLES.map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="bg-slate-900 text-white"
                  >
                    {role}
                  </option>
                ))}
              </select>
              {errors["categoryDetails.role"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.role"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="crew-count"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Number of Crew Members <span className="text-rose-400">*</span>
              </label>
              <input
                id="crew-count"
                type="number"
                min="1"
                value={crewData.crewCount}
                onChange={(e) =>
                  onCrewChange(
                    "crewCount",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="e.g. 2"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.crewCount"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                }`}
              />
              {errors["categoryDetails.crewCount"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.crewCount"]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="crew-duration"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Working Duration / Shift <span className="text-rose-400">*</span>
              </label>
              <input
                id="crew-duration"
                type="text"
                value={crewData.duration}
                onChange={(e) => onCrewChange("duration", e.target.value)}
                placeholder="e.g. 8 hours (12 PM - 8 PM)"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  errors["categoryDetails.duration"]
                    ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                }`}
              />
              {errors["categoryDetails.duration"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.duration"]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="crew-budget"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Total Crew Budget (USD) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-semibold text-sm">
                  $
                </span>
                <input
                  id="crew-budget"
                  type="number"
                  min="1"
                  value={crewData.budget}
                  onChange={(e) =>
                    onCrewChange(
                      "budget",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="e.g. 1800"
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    errors["categoryDetails.budget"]
                      ? "border-rose-500/80 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/20"
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-slate-900/80 text-white placeholder-slate-500"
                  }`}
                />
              </div>
              {errors["categoryDetails.budget"] && (
                <p className="text-xs font-medium text-rose-400 mt-1">
                  {errors["categoryDetails.budget"]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="crew-notes"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Notes & Shift Details{" "}
              <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              id="crew-notes"
              rows={3}
              value={crewData.notes}
              onChange={(e) => onCrewChange("notes", e.target.value)}
              placeholder="Outline call times, safety briefing, uniform requirements, or meals provided..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
