import express from "express";
import {
  createCourse,
  deletedCourse,
  getCourse,
  getCourseById,
  getCourseByIdTested,
  getCourseLearnById,
  reOrderChapter,
  updateCategoryCourse,
  updateCourse,
} from "../controllers/CourseController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import apicache from "apicache";
import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

let cache = apicache.middleware;

const router = express.Router();

router.get("/api/v1/course", getCourse);

router.get("/api/v1/course/:id", getCourseById);

router.get("/api/v1/course/:id/tested", getCourseByIdTested);

router.get(
  "/api/v1/course/learn/:userId/:courseId",
  verifyToken,
  verifyUser,
  getCourseLearnById
);

router.post("/api/v1/course", verifyAdmin, verifyToken, createCourse);
router.put("/api/v1/course/:id", verifyAdmin, verifyToken, updateCourse);
router.put(
  "/api/v1/courses/chapters/reorder",
  verifyAdmin,
  verifyToken,
  reOrderChapter
);

router.put(
  "/api/v1/course/category/:id",
  verifyAdmin,
  verifyToken,
  updateCategoryCourse
);
router.delete("/api/v1/course/:id", verifyAdmin, verifyToken, deletedCourse);

export default router;
