import {
  CreateRequirementPayload,
  RequirementFormData,
} from "../types/requirement";

export function buildRequirementPayload(
  formData: RequirementFormData
): CreateRequirementPayload {
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

  return {
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
}
