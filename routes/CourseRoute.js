import express from "express";
import { createCourse, deletedCourse, getCourse, getCourseById, reOrderChapter, updateCategoryCourse, updateCourse } from "../controllers/CourseController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router()

router.get('/api/v1/course', verifyToken, getCourse)
router.get('/api/v1/course/:id',verifyToken, getCourseById)
router.post('/api/v1/course', createCourse)
router.put('/api/v1/course/:id', updateCourse)
router.put('/api/v1/courses/chapters/reorder', reOrderChapter )
router.put('/api/v1/course/category/:id', updateCategoryCourse)
router.delete('/api/v1/course/:id', deletedCourse)


export default router