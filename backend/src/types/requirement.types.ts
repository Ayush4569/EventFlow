export type RequirementCategory = "planner" | "performer" | "crew";

export interface EventBasics {
  name: string;
  type: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
}

export interface PlannerDetails {
  guestCount: number;
  servicesRequired: string[];
  budget: number;
  notes?: string;
}

export interface PerformerDetails {
  performanceType: string;
  performerCount: number;
  duration: string;
  preferences: string;
  budget: number;
}

export interface CrewDetails {
  role: string;
  crewCount: number;
  duration: string;
  budget: number;
  notes?: string;
}

export interface PlannerAdditional {
  timeline?: string;
  preferredStyle?: string;
  specialArrangements?: string;
}

export interface PerformerAdditional {
  preferredTime?: string;
  equipmentRequirements?: string;
  indoorOutdoorPreference?: string;
  travelRequirements?: string;
}

export interface CrewAdditional {
  arrivalTime?: string;
  equipmentRequirements?: string;
  workEnvironment?: string;
  requiredSkills?: string;
}

export type CategoryDetails = PlannerDetails | PerformerDetails | CrewDetails;
export type AdditionalRequirements =
  | PlannerAdditional
  | PerformerAdditional
  | CrewAdditional;

export interface CreateRequirementInput {
  event: EventBasics;
  category: RequirementCategory;
  categoryDetails: CategoryDetails;
  additionalRequirements?: AdditionalRequirements;
}
