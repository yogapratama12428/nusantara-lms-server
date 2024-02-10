import express from "express";
import {
  createChapter,
  deleteChapter,
  deleteProgress,
  getChapter,
  getChapterById,
  getChapterProgressById,
  updateChapter,
  updateProgress,
} from "../controllers/ChapterController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/api/v1/chapter", verifyToken, getChapter);
router.get("/api/v1/chapter/:id", verifyToken, getChapterById);
router.post("/api/v1/chapter", verifyToken, createChapter);
router.put("/api/v1/chapter/:id", verifyToken, updateChapter);
router.delete("/api/v1/chapter/:id", verifyToken, deleteChapter);

router.get(
  "/api/v1/chapter/progres/:userId/:courseId",
  verifyToken,
  getChapterProgressById
);
router.post("/api/v1/chapter/progress", verifyToken, updateProgress);
router.delete("/api/v1/chapter/progres/:id", verifyToken, deleteProgress);

export default router;
