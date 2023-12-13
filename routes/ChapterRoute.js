import express from "express";
import { createChapter, deleteChapter, getChapter, getChapterById, updateChapter } from "../controllers/ChapterController.js";


const router = express.Router()

router.get('/api/v1/chapter', getChapter)
router.get('/api/v1/chapter/:id', getChapterById)
router.post('/api/v1/chapter', createChapter)
router.put('/api/v1/chapter/:id', updateChapter)
router.delete('/api/v1/chapter/:id', deleteChapter)


export default router