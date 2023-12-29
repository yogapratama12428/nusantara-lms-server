import express from 'express';
import { createPoint, deletePoint, getPoint } from '../controllers/PointsController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/api/v1/point', verifyToken, getPoint )
router.post('/api/v1/point', verifyToken, createPoint)   
router.delete('/api/v1/point/:id', verifyToken, deletePoint)

export default router