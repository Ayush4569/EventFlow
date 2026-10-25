import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5001"),
  MONGODB_URI: z
    .string()
    .default("mongodb://127.0.0.1:27017/event_requirements"),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  CLIENT_URL: z.string().optional(),
});

export const ENV = envSchema.parse({
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  FRONTEND_URL: process.env.FRONTEND_URL || process.env.CLIENT_URL,
  CLIENT_URL: process.env.CLIENT_URL,
});
