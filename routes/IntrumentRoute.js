import express from 'express';
import { createInstrument, deleteInstrument, getInstrumentById, getInstruments, updateInstrument } from '../controllers/IntrumentsController.js';

const router = express.Router();

router.get('/api/v1/instrument', getInstruments)
router.get('/api/v1/instrument/:id', getInstrumentById)
router.post('/api/v1/instrument', createInstrument)
router.put('/api/v1/instrument/:id', updateInstrument)
router.delete('/api/v1/instrument/:id', deleteInstrument)


export default router