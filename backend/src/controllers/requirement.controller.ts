import { Request, Response } from "express";
import mongoose from "mongoose";
import { Requirement } from "../models/requirement.model";
import {
  createRequirementSchema,
  formatZodErrors,
} from "../validators/requirement.validator";
import { CustomError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

export const createRequirement = asyncHandler(
  async (req: Request, res: Response) => {
    const parseResult = createRequirementSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errors = formatZodErrors(parseResult.error);
      throw new CustomError(
        400,
        "Validation failed. Please correct the highlighted errors.",
        errors
      );
    }

    const { event, category, categoryDetails, additionalRequirements } =
      parseResult.data;

    const requirement = new Requirement({
      event: {
        name: event.name,
        type: event.type,
        startDate: event.startDate,
        endDate: event.endDate || undefined,
        location: event.location,
        venue: event.venue || undefined,
      },
      category,
      categoryDetails,
      additionalRequirements: additionalRequirements || {},
    });

    const saved = await requirement.save();

    res.status(201).json({
      success: true,
      message: "Event requirement submitted successfully.",
      id: saved._id,
      data: saved,
    });
  }
);

export const getRequirementById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(400, "Invalid requirement ID format.");
    }

    const requirement = await Requirement.findById(id);
    if (!requirement) {
      throw new CustomError(404, "Requirement not found.");
    }

    res.status(200).json({
      success: true,
      data: requirement,
    });
  }
);

export const getAllRequirements = asyncHandler(
  async (_req: Request, res: Response) => {
    const requirements = await Requirement.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  }
);
