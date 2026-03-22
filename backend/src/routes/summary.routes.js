import express from "express";
import { generateSummary } from "../controllers/summary.controller.js";

const router = express.Router();

// React will POST to /api/v1/meetings/summary
router.post("/summary", generateSummary);

export default router;
