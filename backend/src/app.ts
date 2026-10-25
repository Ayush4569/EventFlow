import express, { Express } from "express";
import cors from "cors";

import { ENV } from "./config/env";

const app = express();
const port = Number(ENV.PORT);

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

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});

