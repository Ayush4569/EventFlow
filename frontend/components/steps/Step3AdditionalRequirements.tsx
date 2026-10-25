"use client";

import {
  RequirementCategory,
  PlannerAdditional,
  PerformerAdditional,
  CrewAdditional,
} from "@/types/requirement";

interface Step3Props {
  category: RequirementCategory;
  plannerData: PlannerAdditional;
  performerData: PerformerAdditional;
  crewData: CrewAdditional;
  onPlannerChange: (field: keyof PlannerAdditional, value: string) => void;
  onPerformerChange: (field: keyof PerformerAdditional, value: string) => void;
  onCrewChange: (field: keyof CrewAdditional, value: string) => void;
}

const TIMELINE_OPTIONS = [
  "Immediate / Within 2 weeks",
  "1 to 3 months ahead",
  "3 to 6 months ahead",
  "6+ months ahead",
];

const ENVIRONMENT_OPTIONS = [
  { value: "indoor", label: "Indoor Only" },
  { value: "outdoor", label: "Outdoor Only" },
  { value: "either", label: "Either / Flexible" },
];

export default function Step3AdditionalRequirements({
  category,
  plannerData,
  performerData,
  crewData,
  onPlannerChange,
  onPerformerChange,
  onCrewChange,
}: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/70 border border-indigo-800/60 px-2.5 py-0.5 rounded-md">
            Optional Customizations
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Step 3: Additional Requirements
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Add specific preferences and operational details for your{" "}
          <span className="font-semibold text-slate-200 capitalize">
            {category}
          </span>
          . All fields in this step are optional.
        </p>
      </div>

      {category === "planner" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="planner-timeline"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Planning Timeline
              </label>
              <select
                id="planner-timeline"
                value={plannerData.timeline}
                onChange={(e) => onPlannerChange("timeline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="" className="bg-slate-900 text-slate-400">
                  Select planning horizon...
                </option>
                {TIMELINE_OPTIONS.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className="bg-slate-900 text-white"
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="planner-style"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Preferred Style / Aesthetic
              </label>
              <input
                id="planner-style"
                type="text"
                value={plannerData.preferredStyle}
                onChange={(e) =>
                  onPlannerChange("preferredStyle", e.target.value)
                }
                placeholder="e.g. Modern Minimalist, Luxury Black Tie, Rustic Chic"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="planner-arrangements"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Special Arrangements & Constraints
            </label>
            <textarea
              id="planner-arrangements"
              rows={3}
              value={plannerData.specialArrangements}
              onChange={(e) =>
                onPlannerChange("specialArrangements", e.target.value)
              }
              placeholder="e.g. High-security VIP check-in, kosher/vegan catering mandates, historic building permit compliance..."
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
                htmlFor="performer-time"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Preferred Performance Time
              </label>
              <input
                id="performer-time"
                type="text"
                value={performerData.preferredTime}
                onChange={(e) =>
                  onPerformerChange("preferredTime", e.target.value)
                }
                placeholder="e.g. 7:30 PM - 9:30 PM (Cocktail Hour)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="performer-env"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Indoor / Outdoor Setting
              </label>
              <select
                id="performer-env"
                value={performerData.indoorOutdoorPreference}
                onChange={(e) =>
                  onPerformerChange(
                    "indoorOutdoorPreference",
                    e.target.value
                  )
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="" className="bg-slate-900 text-slate-400">
                  Select setting preference...
                </option>
                {ENVIRONMENT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-slate-900 text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="performer-equipment"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Equipment & Technical Rider Needs
            </label>
            <input
              id="performer-equipment"
              type="text"
              value={performerData.equipmentRequirements}
              onChange={(e) =>
                onPerformerChange("equipmentRequirements", e.target.value)
              }
              placeholder="e.g. 2 wireless Shure SM58 mics, drum kit shell pack, 2 active stage monitors"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="performer-travel"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Travel & Hospitality Arrangements
            </label>
            <input
              id="performer-travel"
              type="text"
              value={performerData.travelRequirements}
              onChange={(e) =>
                onPerformerChange("travelRequirements", e.target.value)
              }
              placeholder="e.g. Local talent preferred / Flight + 1 night hotel covered for regional acts"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}

      {category === "crew" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="crew-arrival"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Required Arrival / Call Time
              </label>
              <input
                id="crew-arrival"
                type="text"
                value={crewData.arrivalTime}
                onChange={(e) => onCrewChange("arrivalTime", e.target.value)}
                placeholder="e.g. 2 hours before event start (2:00 PM)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="crew-env"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Work Environment
              </label>
              <input
                id="crew-env"
                type="text"
                value={crewData.workEnvironment}
                onChange={(e) =>
                  onCrewChange("workEnvironment", e.target.value)
                }
                placeholder="e.g. High-noise concert floor, outdoor covered stage, elevated control booth"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="crew-equipment"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Tools & Equipment Requirements
            </label>
            <input
              id="crew-equipment"
              type="text"
              value={crewData.equipmentRequirements}
              onChange={(e) =>
                onCrewChange("equipmentRequirements", e.target.value)
              }
              placeholder="e.g. Bring own multi-tool, flashlight, steel-toe shoes; radios provided on site"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="crew-skills"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Required Skills & Certifications
            </label>
            <input
              id="crew-skills"
              type="text"
              value={crewData.requiredSkills}
              onChange={(e) =>
                onCrewChange("requiredSkills", e.target.value)
              }
              placeholder="e.g. Dante audio level 2 certified, OSHA 10, ETCP rigging certified"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-white placeholder-slate-500 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
