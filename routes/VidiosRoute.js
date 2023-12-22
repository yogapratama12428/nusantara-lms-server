import express from 'express';
import { createVidios, deleteVidios, getVidios, getVidiosById, updateVidios } from '../controllers/VidiosController.js';

const router = express.Router();

router.get('/api/v1/vidios', getVidios)
router.get('/api/v1/vidios/:id', getVidiosById)
router.post('/api/v1/vidios', createVidios)
router.put('/api/v1/vidios/:id', updateVidios)
router.delete('/api/v1/vidios/:id', deleteVidios)


export default router