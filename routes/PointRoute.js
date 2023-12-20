import express from 'express';
import { createPoint, deletePoint, getPoint } from '../controllers/PointsController.js';

const router = express.Router();

router.get('/api/v1/point', getPoint )
router.post('/api/v1/point', createPoint)   
router.delete('/api/v1/point/:id', deletePoint)

export default router