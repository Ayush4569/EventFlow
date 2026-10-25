export type RequirementCategory = "planner" | "performer" | "crew";

export interface EventBasics {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
}

export interface PlannerDetails {
  guestCount: number | "";
  servicesRequired: string[];
  budget: number | "";
  notes: string;
}

export interface PerformerDetails {
  performanceType: string;
  performerCount: number | "";
  duration: string;
  preferences: string;
  budget: number | "";
}

export interface CrewDetails {
  role: string;
  crewCount: number | "";
  duration: string;
  budget: number | "";
  notes: string;
}

export interface PlannerAdditional {
  timeline: string;
  preferredStyle: string;
  specialArrangements: string;
}

export interface PerformerAdditional {
  preferredTime: string;
  equipmentRequirements: string;
  indoorOutdoorPreference: string;
  travelRequirements: string;
}

export interface CrewAdditional {
  arrivalTime: string;
  equipmentRequirements: string;
  workEnvironment: string;
  requiredSkills: string;
}

export interface RequirementFormData {
  event: EventBasics;
  category: RequirementCategory;
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;
  plannerAdditional: PlannerAdditional;
  performerAdditional: PerformerAdditional;
  crewAdditional: CrewAdditional;
}

export interface CreateRequirementPayload {
  event: {
    name: string;
    type: string;
    startDate: string;
    endDate?: string;
    location: string;
    venue?: string;
  };
  category: RequirementCategory;
  categoryDetails: Record<string, unknown>;
  additionalRequirements: Record<string, unknown>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  id?: string;
  data?: T;
  errors?: Record<string, string>;
}
