import express from "express";
import { createChapter, deleteChapter, getChapter, getChapterById, updateChapter } from "../controllers/ChapterController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import apicache from 'apicache'

let cache = apicache.middleware

const router = express.Router()

router.get('/api/v1/chapter', verifyToken, getChapter)
router.get('/api/v1/chapter/:id', verifyToken, getChapterById)
router.post('/api/v1/chapter',verifyToken, createChapter)
router.put('/api/v1/chapter/:id',verifyToken, updateChapter)
router.delete('/api/v1/chapter/:id',verifyToken, deleteChapter)


export default router