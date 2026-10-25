import { Router } from "express";
import {
  createRequirement,
  getRequirementById,
  getAllRequirements,
} from "../controllers/requirement.controller";

const router = Router();

router.post("/", createRequirement);
router.get("/", getAllRequirements);
router.get("/:id", getRequirementById);

export default router;
