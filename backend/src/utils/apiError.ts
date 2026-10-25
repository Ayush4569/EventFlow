import type { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number;
  success: boolean;
  errors?: Record<string, string>;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors?: Record<string, string>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
  }
}

export const ApiError = CustomError;

export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
  errors?: Record<string, string>;
}

export const errorHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  console.error("---- Error Occurred ----");
  console.error("Method:", req.method);
  console.error("Endpoint:", req.originalUrl);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);

  return res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors ? { errors: err.errors } : {}),
  });
};
