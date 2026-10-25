import { z } from "zod";

export const eventBasicsSchema = z
  .object(
    {
      name: z
        .string({ message: "Event name is required." })
        .trim()
        .min(1, "Event name is required."),
      type: z
        .string({ message: "Event type is required." })
        .trim()
        .min(1, "Event type is required."),
      startDate: z
        .string({ message: "Start date is required." })
        .trim()
        .min(1, "Start date is required.")
        .refine(
          (val) => !isNaN(Date.parse(val)),
          "Start date must be a valid date."
        ),
      endDate: z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => !val || !isNaN(Date.parse(val)),
          "End date must be a valid date."
        ),
      location: z
        .string({ message: "Location is required." })
        .trim()
        .min(1, "Location is required."),
      venue: z.string().trim().optional(),
    },
    { message: "Event details are required." }
  )
  .refine(
    (data) => {
      if (
        data.endDate &&
        data.startDate &&
        !isNaN(Date.parse(data.startDate)) &&
        !isNaN(Date.parse(data.endDate))
      ) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date cannot precede the start date.",
      path: ["endDate"],
    }
  );

export const plannerDetailsSchema = z.object(
  {
    guestCount: z.coerce
      .number({ message: "Guest count must be a positive number." })
      .positive("Guest count must be a positive number."),
    servicesRequired: z
      .array(z.string().min(1), {
        message: "At least one required service must be selected.",
      })
      .min(1, "At least one required service must be selected."),
    budget: z.coerce
      .number({ message: "Budget must be a positive number." })
      .positive("Budget must be a positive number."),
    notes: z.string().trim().optional(),
  },
  { message: "Category details are required." }
);

export const performerDetailsSchema = z.object(
  {
    performanceType: z
      .string({ message: "Performance type is required." })
      .trim()
      .min(1, "Performance type is required."),
    performerCount: z.coerce
      .number({ message: "Number of performers must be at least 1." })
      .int()
      .min(1, "Number of performers must be at least 1."),
    duration: z
      .string({ message: "Performance duration is required." })
      .trim()
      .min(1, "Performance duration is required."),
    preferences: z
      .string({ message: "Performance preferences/style are required." })
      .trim()
      .min(1, "Performance preferences/style are required."),
    budget: z.coerce
      .number({ message: "Budget must be a positive number." })
      .positive("Budget must be a positive number."),
  },
  { message: "Category details are required." }
);

export const crewDetailsSchema = z.object(
  {
    role: z
      .string({ message: "Crew role is required." })
      .trim()
      .min(1, "Crew role is required."),
    crewCount: z.coerce
      .number({ message: "Number of crew members must be at least 1." })
      .int()
      .min(1, "Number of crew members must be at least 1."),
    duration: z
      .string({ message: "Working duration is required." })
      .trim()
      .min(1, "Working duration is required."),
    budget: z.coerce
      .number({ message: "Budget must be a positive number." })
      .positive("Budget must be a positive number."),
    notes: z.string().trim().optional(),
  },
  { message: "Category details are required." }
);

export const plannerAdditionalSchema = z
  .object({
    timeline: z.string().trim().optional(),
    preferredStyle: z.string().trim().optional(),
    specialArrangements: z.string().trim().optional(),
  })
  .optional()
  .default({});

export const performerAdditionalSchema = z
  .object({
    preferredTime: z.string().trim().optional(),
    indoorOutdoorPreference: z.string().trim().optional(),
    equipmentRequirements: z.string().trim().optional(),
    travelRequirements: z.string().trim().optional(),
  })
  .optional()
  .default({});

export const crewAdditionalSchema = z
  .object({
    arrivalTime: z.string().trim().optional(),
    workEnvironment: z.string().trim().optional(),
    equipmentRequirements: z.string().trim().optional(),
    requiredSkills: z.string().trim().optional(),
  })
  .optional()
  .default({});

export const createRequirementSchema = z
  .object({
    event: eventBasicsSchema,
    category: z.enum(["planner", "performer", "crew"], {
      message: "Category must be one of: planner, performer, crew.",
    }),
    categoryDetails: z.record(z.string(), z.unknown(), {
      message: "Category details are required.",
    }),
    additionalRequirements: z
      .record(z.string(), z.unknown())
      .optional()
      .default({}),
  })
  .superRefine((data, ctx) => {
    if (data.category === "planner") {
      const res = plannerDetailsSchema.safeParse(data.categoryDetails);
      if (!res.success) {
        for (const issue of res.error.issues) {
          ctx.addIssue({
            ...issue,
            path: ["categoryDetails", ...issue.path],
          });
        }
      }
    } else if (data.category === "performer") {
      const res = performerDetailsSchema.safeParse(data.categoryDetails);
      if (!res.success) {
        for (const issue of res.error.issues) {
          ctx.addIssue({
            ...issue,
            path: ["categoryDetails", ...issue.path],
          });
        }
      }
    } else if (data.category === "crew") {
      const res = crewDetailsSchema.safeParse(data.categoryDetails);
      if (!res.success) {
        for (const issue of res.error.issues) {
          ctx.addIssue({
            ...issue,
            path: ["categoryDetails", ...issue.path],
          });
        }
      }
    }
  });

export type CreateRequirementSchemaInput = z.infer<
  typeof createRequirementSchema
>;

export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}
