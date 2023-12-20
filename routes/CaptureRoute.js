import express from 'express';
import { createCapture, deleteCapture, getCapture } from '../controllers/CaptureController.js';


const router = express.Router();

router.get('/api/v1/capture', getCapture )
router.post('/api/v1/capture', createCapture)
router.delete('/api/v1/capture/:id', deleteCapture)

export default router