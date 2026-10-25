"use client";

import { RequirementFormData } from "@/types/requirement";

interface Step4Props {
  formData: RequirementFormData;
  isSubmitting: boolean;
  submissionError: string | null;
  fieldErrors?: Record<string, string>;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}

export default function Step4ReviewSubmit({
  formData,
  isSubmitting,
  submissionError,
  fieldErrors,
  onEditStep,
  onSubmit,
}: Step4Props) {
  const {
    event,
    category,
    plannerDetails,
    performerDetails,
    crewDetails,
    plannerAdditional,
    performerAdditional,
    crewAdditional,
  } = formData;

  const categoryConfig = {
    planner: {
      label: "Event Planner",
      badge: "border-indigo-500/40 bg-indigo-950/60 text-indigo-300",
      accent: "text-indigo-400",
      budget: plannerDetails.budget,
      scaleLabel: "Guest Count",
      scaleValue: plannerDetails.guestCount
        ? `${plannerDetails.guestCount} Guests`
        : "—",
      duration: plannerAdditional.timeline || "Flexible",
    },
    performer: {
      label: "Performer",
      badge: "border-purple-500/40 bg-purple-950/60 text-purple-300",
      accent: "text-purple-400",
      budget: performerDetails.budget,
      scaleLabel: "Performers",
      scaleValue: performerDetails.performerCount
        ? `${performerDetails.performerCount} Artists`
        : "—",
      duration: performerDetails.duration || "—",
    },
    crew: {
      label: "Event Crew",
      badge: "border-amber-500/40 bg-amber-950/60 text-amber-300",
      accent: "text-amber-400",
      budget: crewDetails.budget,
      scaleLabel: "Crew Members",
      scaleValue: crewDetails.crewCount
        ? `${crewDetails.crewCount} Technicians`
        : "—",
      duration: crewDetails.duration || "—",
    },
  }[category];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Step 4: Review & Post Requirement
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Review your verified specifications below. You can quickly edit any section prior to dispatching your posting.
        </p>
      </div>

      {submissionError && (
        <div
          role="alert"
          className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-200 text-sm space-y-2 shadow-lg shadow-rose-950/50"
        >
          <div className="flex items-center gap-2 font-bold text-rose-300">
            <svg
              className="w-5 h-5 text-rose-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Submission Error</span>
          </div>
          <p className="text-xs text-rose-300/90">{submissionError}</p>
          {fieldErrors && Object.keys(fieldErrors).length > 0 && (
            <ul className="text-xs list-disc list-inside space-y-1 text-rose-300/80 pl-1">
              {Object.entries(fieldErrors).map(([key, msg]) => (
                <li key={key}>
                  <strong className="capitalize text-rose-200">
                    {key.replace("categoryDetails.", "").replace("event.", "")}:
                  </strong>{" "}
                  {msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${categoryConfig.badge}`}
              >
                {categoryConfig.label}
              </span>
              <span className="text-xs text-slate-400 font-medium bg-slate-800/60 border border-slate-700/50 px-2.5 py-0.5 rounded-full">
                {event.type || "General Event"}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {event.name || "Untitled Event Requirement"}
            </h3>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location || "Location not set"}
                {event.venue ? ` • ${event.venue}` : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {event.startDate || "Date not set"}
                {event.endDate ? ` → ${event.endDate}` : ""}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Allocated Budget
            </span>
            <span className="text-2xl font-black text-emerald-400 tracking-tight">
              {categoryConfig.budget
                ? `$${Number(categoryConfig.budget).toLocaleString()}`
                : "—"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">
              Role Type
            </span>
            <span className="text-sm font-bold text-white capitalize mt-0.5 block truncate">
              {category}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">
              {categoryConfig.scaleLabel}
            </span>
            <span className="text-sm font-bold text-white mt-0.5 block truncate">
              {categoryConfig.scaleValue}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">
              Duration / Timeline
            </span>
            <span className="text-sm font-bold text-white mt-0.5 block truncate">
              {categoryConfig.duration}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block font-medium">
              Posting Status
            </span>
            <span className="text-sm font-bold text-indigo-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Ready to Save
            </span>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Event Parameters
                </span>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => onEditStep(1)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Edit</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-500 block">Name:</span>
                <span className="text-slate-200 font-medium">
                  {event.name || "—"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Type:</span>
                <span className="text-slate-200 font-medium">
                  {event.type || "—"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Location:</span>
                <span className="text-slate-200 font-medium">
                  {event.location}
                  {event.venue ? ` (${event.venue})` : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {categoryConfig.label} Specifications
                </span>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => onEditStep(2)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Edit</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            {category === "planner" && (
              <div className="space-y-2.5 text-xs pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {plannerDetails.servicesRequired?.map((srv) => (
                    <span
                      key={srv}
                      className="px-2.5 py-1 rounded-md bg-indigo-950/70 border border-indigo-800/50 text-indigo-200 font-medium text-[11px]"
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>
                {plannerDetails.notes && (
                  <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs leading-relaxed">
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Notes:
                    </span>
                    {plannerDetails.notes}
                  </p>
                )}
              </div>
            )}

            {category === "performer" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-500 block">Performance Type:</span>
                  <span className="text-slate-200 font-medium">
                    {performerDetails.performanceType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duration:</span>
                  <span className="text-slate-200 font-medium">
                    {performerDetails.duration}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block">Style / Genres:</span>
                  <span className="text-slate-200 font-medium">
                    {performerDetails.preferences}
                  </span>
                </div>
              </div>
            )}

            {category === "crew" && (
              <div className="space-y-2 text-xs pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 block">Assigned Role:</span>
                    <span className="text-slate-200 font-medium">
                      {crewDetails.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Shift Duration:</span>
                    <span className="text-slate-200 font-medium">
                      {crewDetails.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Headcount:</span>
                    <span className="text-slate-200 font-medium">
                      {crewDetails.crewCount} crew members
                    </span>
                  </div>
                </div>
                {crewDetails.notes && (
                  <p className="text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs leading-relaxed">
                    <span className="text-slate-500 font-semibold block mb-0.5">
                      Shift Notes:
                    </span>
                    {crewDetails.notes}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Customization & Rider Logistics
                </span>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => onEditStep(3)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Edit</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {category === "planner" && (
                <>
                  <div>
                    <span className="text-slate-500 block">Planning Horizon:</span>
                    <span className="text-slate-200 font-medium">
                      {plannerAdditional.timeline || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Preferred Style:</span>
                    <span className="text-slate-200 font-medium">
                      {plannerAdditional.preferredStyle || "Not specified"}
                    </span>
                  </div>
                  {plannerAdditional.specialArrangements && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">
                        Special Arrangements:
                      </span>
                      <span className="text-slate-200 font-medium">
                        {plannerAdditional.specialArrangements}
                      </span>
                    </div>
                  )}
                </>
              )}

              {category === "performer" && (
                <>
                  <div>
                    <span className="text-slate-500 block">Performance Window:</span>
                    <span className="text-slate-200 font-medium">
                      {performerAdditional.preferredTime || "Flexible"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Setting:</span>
                    <span className="text-slate-200 font-medium capitalize">
                      {performerAdditional.indoorOutdoorPreference || "Flexible"}
                    </span>
                  </div>
                  {performerAdditional.equipmentRequirements && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Equipment Rider:</span>
                      <span className="text-slate-200 font-medium">
                        {performerAdditional.equipmentRequirements}
                      </span>
                    </div>
                  )}
                  {performerAdditional.travelRequirements && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Hospitality / Travel:</span>
                      <span className="text-slate-200 font-medium">
                        {performerAdditional.travelRequirements}
                      </span>
                    </div>
                  )}
                </>
              )}

              {category === "crew" && (
                <>
                  <div>
                    <span className="text-slate-500 block">Call Time:</span>
                    <span className="text-slate-200 font-medium">
                      {crewAdditional.arrivalTime || "To be arranged"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Work Environment:</span>
                    <span className="text-slate-200 font-medium">
                      {crewAdditional.workEnvironment || "Standard venue"}
                    </span>
                  </div>
                  {crewAdditional.equipmentRequirements && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Tools & Safety:</span>
                      <span className="text-slate-200 font-medium">
                        {crewAdditional.equipmentRequirements}
                      </span>
                    </div>
                  )}
                  {crewAdditional.requiredSkills && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Required Skills:</span>
                      <span className="text-slate-200 font-medium">
                        {crewAdditional.requiredSkills}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Submitting to Database...</span>
            </>
          ) : (
            <>
              <span>Post Event Requirement</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
