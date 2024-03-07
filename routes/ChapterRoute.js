import express from "express";
import {
  createChapter,
  createChapterQuestionProgress,
  deleteChapter,
  deleteChapterQuestionProgress,
  deleteProgress,
  getChapter,
  getChapterById,
  getChapterProgressById,
  getChapterProgressQuestionById,
  updateChapter,
  updateChapterQuestionProgress,
  updateProgress,
} from "../controllers/ChapterController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/api/v1/chapter", verifyAdmin, verifyToken, getChapter);
router.get("/api/v1/chapter/:id", verifyToken, getChapterById);
router.post("/api/v1/chapter", verifyAdmin, verifyToken, createChapter);
router.put("/api/v1/chapter/:id", verifyAdmin, verifyToken, updateChapter);
router.delete("/api/v1/chapter/:id", verifyAdmin, verifyToken, deleteChapter);

router.get(
  "/api/v1/chapter/progres/:userId/:courseId",
  verifyUser,
  verifyToken,
  getChapterProgressById
);

router.post(
  "/api/v1/chapter/progress",
  verifyUser,
  verifyToken,
  updateProgress
);

router.delete(
  "/api/v1/chapter/progres/:id",
  verifyAdmin,
  verifyToken,
  deleteProgress
);

router.post(
  "/api/v1/chapter/progress/question",
  verifyUser,
  verifyToken,
  createChapterQuestionProgress
);

router.get(
  "/api/v1/chapter/progres/:userId/question/:chapterId",
  verifyUser,
  verifyToken,
  getChapterProgressQuestionById
);

router.put(
  "/api/v1/chapter/:chapterId/question/:userId",
  verifyUser,
  verifyToken,
  updateChapterQuestionProgress
);

router.delete(
  "/api/v1/chapter/progress/question/:userId",
  verifyAdmin,
  verifyToken,
  deleteChapterQuestionProgress
);

export default router;
