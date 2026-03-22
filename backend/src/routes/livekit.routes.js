import express from "express";
import { createToken } from "../controllers/livekit.controller.js"; // make sure this path is correct!

const router = express.Router();

router.post("/getToken", createToken);

export default router;
