import express from 'express';
import { createInstrument, deleteInstrument, getInstrumentById, getInstruments, updateInstrument } from '../controllers/IntrumentsController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/api/v1/instrument', verifyToken, getInstruments)
router.get('/api/v1/instrument/:id', verifyToken, getInstrumentById)
router.post('/api/v1/instrument', verifyToken, createInstrument)
router.put('/api/v1/instrument/:id', verifyToken, updateInstrument)
router.delete('/api/v1/instrument/:id', verifyToken, deleteInstrument)

export default router