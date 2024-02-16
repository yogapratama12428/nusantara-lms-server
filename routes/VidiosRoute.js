import express from "express";
import {
  createVidios,
  deleteVidios,
  getVidios,
  getVidiosById,
  updateVidios,
} from "../controllers/VidiosController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/api/v1/vidios", verifyToken, getVidios);
router.get("/api/v1/vidios/learn/:id/:userId", verifyToken, getVidiosById);
router.post("/api/v1/vidios", verifyToken, createVidios);
router.put("/api/v1/vidios/:id", verifyToken, updateVidios);
router.delete("/api/v1/vidios/:id", verifyToken, deleteVidios);

export default router;
