"use client";

import { useState } from "react";
import {
  RequirementFormData,
  RequirementCategory,
} from "@/types/requirement";
import ProgressIndicator from "./ProgressIndicator";
import Step1EventBasics from "../steps/Step1EventBasics";
import Step2CategoryDetails from "../steps/Step2CategoryDetails";
import Step3AdditionalRequirements from "../steps/Step3AdditionalRequirements";
import Step4ReviewSubmit from "../steps/Step4ReviewSubmit";
import SuccessScreen from "./SuccessScreen";
import { submitRequirement } from "@/lib/api";
import {
  validateEventBasics,
  validateCategoryDetails,
} from "@/lib/wizardValidation";
import { buildRequirementPayload } from "@/lib/payloadBuilder";

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

  const handleNext = () => {
    if (currentStep === 1) {
      const step1Errors = validateEventBasics(formData.event);
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      setErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const step2Errors = validateCategoryDetails(formData.category, formData);
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }
      setErrors({});
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
      return;
    }

    if (targetStep === 2 && currentStep === 1) {
      const step1Errors = validateEventBasics(formData.event);
      if (Object.keys(step1Errors).length === 0) {
        setErrors({});
        setCurrentStep(2);
      } else {
        setErrors(step1Errors);
      }
    } else if (targetStep === 3 && currentStep === 2) {
      const step2Errors = validateCategoryDetails(formData.category, formData);
      if (Object.keys(step2Errors).length === 0) {
        setErrors({});
        setCurrentStep(3);
      } else {
        setErrors(step2Errors);
      }
    } else if (targetStep === 4) {
      const step1Errors = validateEventBasics(formData.event);
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        setCurrentStep(1);
        return;
      }
      const step2Errors = validateCategoryDetails(formData.category, formData);
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        setCurrentStep(2);
        return;
      }
      setErrors({});
      setCurrentStep(4);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const step1Errors = validateEventBasics(formData.event);
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      setCurrentStep(1);
      return;
    }

    const step2Errors = validateCategoryDetails(formData.category, formData);
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = buildRequirementPayload(formData);
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
