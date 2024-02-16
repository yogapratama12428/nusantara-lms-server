import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestionById,
  updateQuestion,
} from "../controllers/QuestionChapterController.js";

const router = express.Router();

router.get("/api/v1/question", verifyToken, getQuestion);
router.get("/api/v1/question/:id", verifyToken, getQuestionById);
router.post("/api/v1/question", verifyToken, createQuestion);
router.put("/api/v1/question/:id", verifyToken, updateQuestion);
router.delete("/api/v1/question/:id", verifyToken, deleteQuestion);

export default router;
