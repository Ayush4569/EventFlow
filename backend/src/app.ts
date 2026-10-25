import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import requirementRoutes from "./routes/requirement.routes";
import { errorHandler } from "./utils/apiError";

const app = express();
const port = Number(ENV.PORT);

connectDB();

app.use(
  cors({
    origin: [ENV.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/requirements", requirementRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
