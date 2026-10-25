"use client";

import { useState } from "react";
import {
  RequirementFormData,
  RequirementCategory,
  CreateRequirementPayload,
} from "@/types/requirement";
import ProgressIndicator from "./ProgressIndicator";
import Step1EventBasics from "../steps/Step1EventBasics";
import Step2CategoryDetails from "../steps/Step2CategoryDetails";
import Step3AdditionalRequirements from "../steps/Step3AdditionalRequirements";
import Step4ReviewSubmit from "../steps/Step4ReviewSubmit";
import SuccessScreen from "./SuccessScreen";
import { submitRequirement } from "@/lib/api";

const INITIAL_FORM_DATA: RequirementFormData = {
  event: {
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
  },
  category: "planner",
  plannerDetails: {
    guestCount: "",
    servicesRequired: ["Full Planning & Production"],
    budget: "",
    notes: "",
  },
  performerDetails: {
    performanceType: "",
    performerCount: 1,
    duration: "",
    preferences: "",
    budget: "",
  },
  crewDetails: {
    role: "",
    crewCount: 1,
    duration: "",
    budget: "",
    notes: "",
  },
  plannerAdditional: {
    timeline: "",
    preferredStyle: "",
    specialArrangements: "",
  },
  performerAdditional: {
    preferredTime: "",
    equipmentRequirements: "",
    indoorOutdoorPreference: "",
    travelRequirements: "",
  },
  crewAdditional: {
    arrivalTime: "",
    equipmentRequirements: "",
    workEnvironment: "",
    requiredSkills: "",
  },
};

export default function WizardContainer() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] =
    useState<RequirementFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const handleEventChange = (
    field: keyof RequirementFormData["event"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      event: { ...prev.event, [field]: value },
    }));
    if (errors[`event.${field}`]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`event.${field}`];
        return copy;
      });
    }
  };

  const handleCategoryChange = (category: RequirementCategory) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handlePlannerChange = (
    field: keyof RequirementFormData["plannerDetails"],
    value: RequirementFormData["plannerDetails"][keyof RequirementFormData["plannerDetails"]]
  ) => {
    setFormData((prev) => ({
      ...prev,
      plannerDetails: { ...prev.plannerDetails, [field]: value },
    }));
    if (errors[`categoryDetails.${field}`]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`categoryDetails.${field}`];
        return copy;
      });
    }
  };

  const handlePerformerChange = (
    field: keyof RequirementFormData["performerDetails"],
    value: RequirementFormData["performerDetails"][keyof RequirementFormData["performerDetails"]]
  ) => {
    setFormData((prev) => ({
      ...prev,
      performerDetails: { ...prev.performerDetails, [field]: value },
    }));
    if (errors[`categoryDetails.${field}`]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`categoryDetails.${field}`];
        return copy;
      });
    }
  };

  const handleCrewChange = (
    field: keyof RequirementFormData["crewDetails"],
    value: RequirementFormData["crewDetails"][keyof RequirementFormData["crewDetails"]]
  ) => {
    setFormData((prev) => ({
      ...prev,
      crewDetails: { ...prev.crewDetails, [field]: value },
    }));
    if (errors[`categoryDetails.${field}`]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`categoryDetails.${field}`];
        return copy;
      });
    }
  };

  const handlePlannerAdditionalChange = (
    field: keyof RequirementFormData["plannerAdditional"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      plannerAdditional: { ...prev.plannerAdditional, [field]: value },
    }));
  };

  const handlePerformerAdditionalChange = (
    field: keyof RequirementFormData["performerAdditional"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      performerAdditional: { ...prev.performerAdditional, [field]: value },
    }));
  };

  const handleCrewAdditionalChange = (
    field: keyof RequirementFormData["crewAdditional"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      crewAdditional: { ...prev.crewAdditional, [field]: value },
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.event.name.trim()) {
      newErrors["event.name"] = "Event name is required.";
    }

    if (!formData.event.type.trim()) {
      newErrors["event.type"] = "Please select an event type.";
    }

    if (!formData.event.startDate.trim()) {
      newErrors["event.startDate"] = "Start date is required.";
    }

    if (formData.event.endDate.trim() && formData.event.startDate.trim()) {
      if (new Date(formData.event.endDate) < new Date(formData.event.startDate)) {
        newErrors["event.endDate"] = "End date cannot precede the start date.";
      }
    }

    if (!formData.event.location.trim()) {
      newErrors["event.location"] = "Location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { category, plannerDetails, performerDetails, crewDetails } =
      formData;

    if (category === "planner") {
      const count = Number(plannerDetails.guestCount);
      if (!plannerDetails.guestCount || isNaN(count) || count <= 0) {
        newErrors["categoryDetails.guestCount"] =
          "Please enter a valid guest count.";
      }

      if (
        !plannerDetails.servicesRequired ||
        plannerDetails.servicesRequired.length === 0
      ) {
        newErrors["categoryDetails.servicesRequired"] =
          "Select at least one planning service.";
      }

      const budget = Number(plannerDetails.budget);
      if (
        plannerDetails.budget === "" ||
        isNaN(budget) ||
        budget <= 0
      ) {
        newErrors["categoryDetails.budget"] =
          "Please specify a valid budget greater than 0.";
      }
    } else if (category === "performer") {
      if (!performerDetails.performanceType.trim()) {
        newErrors["categoryDetails.performanceType"] =
          "Please select a performance type.";
      }

      const count = Number(performerDetails.performerCount);
      if (
        performerDetails.performerCount === "" ||
        isNaN(count) ||
        count < 1
      ) {
        newErrors["categoryDetails.performerCount"] =
          "Enter at least 1 performer.";
      }

      if (!performerDetails.duration.trim()) {
        newErrors["categoryDetails.duration"] =
          "Performance duration is required.";
      }

      if (!performerDetails.preferences.trim()) {
        newErrors["categoryDetails.preferences"] =
          "Performance preferences are required.";
      }

      const budget = Number(performerDetails.budget);
      if (
        performerDetails.budget === "" ||
        isNaN(budget) ||
        budget <= 0
      ) {
        newErrors["categoryDetails.budget"] =
          "Please specify a valid budget greater than 0.";
      }
    } else if (category === "crew") {
      if (!crewDetails.role.trim()) {
        newErrors["categoryDetails.role"] = "Please select a crew role.";
      }

      const count = Number(crewDetails.crewCount);
      if (crewDetails.crewCount === "" || isNaN(count) || count < 1) {
        newErrors["categoryDetails.crewCount"] =
          "Enter at least 1 crew member.";
      }

      if (!crewDetails.duration.trim()) {
        newErrors["categoryDetails.duration"] =
          "Working duration is required.";
      }

      const budget = Number(crewDetails.budget);
      if (crewDetails.budget === "" || isNaN(budget) || budget <= 0) {
        newErrors["categoryDetails.budget"] =
          "Please specify a valid budget greater than 0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < currentStep) {
      setErrors({});
      setCurrentStep(targetStep);
    } else if (targetStep === 2 && currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (targetStep === 3 && currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (targetStep === 4 && (currentStep === 3 || currentStep < 4)) {
      if (validateStep1() && validateStep2()) setCurrentStep(4);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!validateStep1() || !validateStep2()) {
      setCurrentStep(!validateStep1() ? 1 : 2);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    let categoryDetails: Record<string, unknown> = {};
    let additionalRequirements: Record<string, unknown> = {};

    if (formData.category === "planner") {
      categoryDetails = {
        guestCount: Number(formData.plannerDetails.guestCount),
        servicesRequired: formData.plannerDetails.servicesRequired,
        budget: Number(formData.plannerDetails.budget),
        notes: formData.plannerDetails.notes.trim() || undefined,
      };
      additionalRequirements = {
        timeline: formData.plannerAdditional.timeline.trim() || undefined,
        preferredStyle:
          formData.plannerAdditional.preferredStyle.trim() || undefined,
        specialArrangements:
          formData.plannerAdditional.specialArrangements.trim() || undefined,
      };
    } else if (formData.category === "performer") {
      categoryDetails = {
        performanceType: formData.performerDetails.performanceType.trim(),
        performerCount: Number(formData.performerDetails.performerCount),
        duration: formData.performerDetails.duration.trim(),
        preferences: formData.performerDetails.preferences.trim(),
        budget: Number(formData.performerDetails.budget),
      };
      additionalRequirements = {
        preferredTime:
          formData.performerAdditional.preferredTime.trim() || undefined,
        indoorOutdoorPreference:
          formData.performerAdditional.indoorOutdoorPreference.trim() ||
          undefined,
        equipmentRequirements:
          formData.performerAdditional.equipmentRequirements.trim() ||
          undefined,
        travelRequirements:
          formData.performerAdditional.travelRequirements.trim() || undefined,
      };
    } else if (formData.category === "crew") {
      categoryDetails = {
        role: formData.crewDetails.role.trim(),
        crewCount: Number(formData.crewDetails.crewCount),
        duration: formData.crewDetails.duration.trim(),
        budget: Number(formData.crewDetails.budget),
        notes: formData.crewDetails.notes.trim() || undefined,
      };
      additionalRequirements = {
        arrivalTime:
          formData.crewAdditional.arrivalTime.trim() || undefined,
        workEnvironment:
          formData.crewAdditional.workEnvironment.trim() || undefined,
        equipmentRequirements:
          formData.crewAdditional.equipmentRequirements.trim() || undefined,
        requiredSkills:
          formData.crewAdditional.requiredSkills.trim() || undefined,
      };
    }

    const payload: CreateRequirementPayload = {
      event: {
        name: formData.event.name.trim(),
        type: formData.event.type.trim(),
        startDate: formData.event.startDate.trim(),
        endDate: formData.event.endDate.trim() || undefined,
        location: formData.event.location.trim(),
        venue: formData.event.venue.trim() || undefined,
      },
      category: formData.category,
      categoryDetails,
      additionalRequirements,
    };

    const result = await submitRequirement(payload);

    setIsSubmitting(false);

    if (result.success && result.id) {
      setCreatedId(result.id);
    } else {
      setSubmissionError(
        result.message || "An unexpected error occurred during submission."
      );
      if (result.errors) {
        setErrors(result.errors);
      }
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmissionError(null);
    setCreatedId(null);
    setCurrentStep(1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md p-6 sm:p-8">
      {createdId ? (
        <SuccessScreen
          requirementId={createdId}
          formData={formData}
          onReset={handleReset}
        />
      ) : (
        <div>
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            onStepClick={handleStepClick}
          />

          <div className="mt-6 min-h-[360px]">
            {currentStep === 1 && (
              <Step1EventBasics
                data={formData.event}
                category={formData.category}
                errors={errors}
                onChange={handleEventChange}
                onCategoryChange={handleCategoryChange}
              />
            )}

            {currentStep === 2 && (
              <Step2CategoryDetails
                category={formData.category}
                plannerData={formData.plannerDetails}
                performerData={formData.performerDetails}
                crewData={formData.crewDetails}
                errors={errors}
                onPlannerChange={handlePlannerChange}
                onPerformerChange={handlePerformerChange}
                onCrewChange={handleCrewChange}
              />
            )}

            {currentStep === 3 && (
              <Step3AdditionalRequirements
                category={formData.category}
                plannerData={formData.plannerAdditional}
                performerData={formData.performerAdditional}
                crewData={formData.crewAdditional}
                onPlannerChange={handlePlannerAdditionalChange}
                onPerformerChange={handlePerformerAdditionalChange}
                onCrewChange={handleCrewAdditionalChange}
              />
            )}

            {currentStep === 4 && (
              <Step4ReviewSubmit
                formData={formData}
                isSubmitting={isSubmitting}
                submissionError={submissionError}
                fieldErrors={errors}
                onEditStep={(step) => setCurrentStep(step)}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleBack}
                className="px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800/80 font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer disabled:opacity-50"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 cursor-pointer flex items-center gap-1.5 active:scale-98"
              >
                <span>Continue</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
