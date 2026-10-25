import { Schema, model, Document } from "mongoose";
import {
  CategoryDetails,
  AdditionalRequirements,
  EventBasics,
  RequirementCategory,
} from "../types/requirement.types";

export interface IRequirement extends Document {
  event: EventBasics;
  category: RequirementCategory;
  categoryDetails: CategoryDetails;
  additionalRequirements: AdditionalRequirements;
  createdAt: Date;
  updatedAt: Date;
}

const EventBasicsSchema = new Schema<EventBasics>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
  },
  { _id: false }
);

const RequirementSchema = new Schema<IRequirement>(
  {
    event: {
      type: EventBasicsSchema,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["planner", "performer", "crew"],
    },
    categoryDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    additionalRequirements: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Requirement = model<IRequirement>(
  "Requirement",
  RequirementSchema
);
