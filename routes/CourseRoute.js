import express from "express";
import { createCourse, deletedCourse, getCourse, getCourseById, reOrderChapter, updateCategoryCourse, updateCourse } from "../controllers/CourseController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import apicache from 'apicache'

let cache = apicache.middleware

const router = express.Router()

router.get('/api/v1/course', cache('2 minutes'), verifyToken, getCourse)
router.get('/api/v1/course/:id', cache('2 minutes'), verifyToken, getCourseById)
router.post('/api/v1/course', verifyToken, createCourse)
router.put('/api/v1/course/:id', verifyToken, updateCourse)
router.put('/api/v1/courses/chapters/reorder',verifyToken, reOrderChapter )
router.put('/api/v1/course/category/:id', verifyToken, updateCategoryCourse)
router.delete('/api/v1/course/:id', verifyToken, deletedCourse)

export default router