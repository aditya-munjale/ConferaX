import express from "express";
import {
  saveSummary,
  getAllSummaries,
  deleteSummary
} from "../controllers/library.controller.js";

const router = express.Router();

// React will POST to this when the host clicks "Publish"
router.post("/save", saveSummary);

// React will GET from this when a devotee opens the Library page
router.get("/all", getAllSummaries);

router.delete("/:id", deleteSummary);

export default router;
