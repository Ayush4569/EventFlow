import {
  EventBasics,
  RequirementCategory,
  RequirementFormData,
} from "../types/requirement";
import {
  isDateInPast,
  isEndDateBeforeStartDate,
  isValidDateString,
} from "./dateUtils";

export function validateEventBasics(event: EventBasics): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!event.name.trim()) {
    errors["event.name"] = "Event name is required.";
  }

  if (!event.type.trim()) {
    errors["event.type"] = "Please select an event type.";
  }

  if (!event.startDate.trim()) {
    errors["event.startDate"] = "Start date is required.";
  } else if (!isValidDateString(event.startDate.trim())) {
    errors["event.startDate"] = "Start date must be a valid date.";
  } else if (isDateInPast(event.startDate.trim())) {
    errors["event.startDate"] = "Start date cannot be in the past.";
  }

  if (event.endDate.trim()) {
    if (!isValidDateString(event.endDate.trim())) {
      errors["event.endDate"] = "End date must be a valid date.";
    } else if (isDateInPast(event.endDate.trim())) {
      errors["event.endDate"] = "End date cannot be in the past.";
    } else if (
      event.startDate.trim() &&
      isValidDateString(event.startDate.trim()) &&
      isEndDateBeforeStartDate(event.startDate.trim(), event.endDate.trim())
    ) {
      errors["event.endDate"] = "End date cannot precede the start date.";
    }
  }

  if (!event.location.trim()) {
    errors["event.location"] = "Location is required.";
  }

  return errors;
}

export function validateCategoryDetails(
  category: RequirementCategory,
  formData: RequirementFormData
): Record<string, string> {
  const errors: Record<string, string> = {};
  const { plannerDetails, performerDetails, crewDetails } = formData;

  if (category === "planner") {
    const count = Number(plannerDetails.guestCount);
    if (!plannerDetails.guestCount || isNaN(count) || count <= 0) {
      errors["categoryDetails.guestCount"] =
        "Please enter a valid guest count.";
    }

    if (
      !plannerDetails.servicesRequired ||
      plannerDetails.servicesRequired.length === 0
    ) {
      errors["categoryDetails.servicesRequired"] =
        "Select at least one planning service.";
    }

    const budget = Number(plannerDetails.budget);
    if (plannerDetails.budget === "" || isNaN(budget) || budget <= 0) {
      errors["categoryDetails.budget"] =
        "Please specify a valid budget greater than 0.";
    }
  } else if (category === "performer") {
    if (!performerDetails.performanceType.trim()) {
      errors["categoryDetails.performanceType"] =
        "Please select a performance type.";
    }

    const count = Number(performerDetails.performerCount);
    if (performerDetails.performerCount === "" || isNaN(count) || count < 1) {
      errors["categoryDetails.performerCount"] = "Enter at least 1 performer.";
    }

    if (!performerDetails.duration.trim()) {
      errors["categoryDetails.duration"] = "Performance duration is required.";
    }

    if (!performerDetails.preferences.trim()) {
      errors["categoryDetails.preferences"] =
        "Performance preferences are required.";
    }

    const budget = Number(performerDetails.budget);
    if (performerDetails.budget === "" || isNaN(budget) || budget <= 0) {
      errors["categoryDetails.budget"] =
        "Please specify a valid budget greater than 0.";
    }
  } else if (category === "crew") {
    if (!crewDetails.role.trim()) {
      errors["categoryDetails.role"] = "Please select a crew role.";
    }

    const count = Number(crewDetails.crewCount);
    if (crewDetails.crewCount === "" || isNaN(count) || count < 1) {
      errors["categoryDetails.crewCount"] = "Enter at least 1 crew member.";
    }

    if (!crewDetails.duration.trim()) {
      errors["categoryDetails.duration"] = "Working duration is required.";
    }

    const budget = Number(crewDetails.budget);
    if (crewDetails.budget === "" || isNaN(budget) || budget <= 0) {
      errors["categoryDetails.budget"] =
        "Please specify a valid budget greater than 0.";
    }
  }

  return errors;
}
