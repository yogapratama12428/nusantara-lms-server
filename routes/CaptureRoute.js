import express from 'express';
import { createCapture, deleteCapture, getCapture } from '../controllers/CaptureController.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

router.get('/api/v1/capture', verifyToken, getCapture )
router.post('/api/v1/capture', verifyToken, createCapture)
router.delete('/api/v1/capture/:id', verifyToken, deleteCapture)

export default router