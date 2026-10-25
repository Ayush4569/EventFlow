import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "5001",
  MONGODB_URI:
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event_requirements",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
