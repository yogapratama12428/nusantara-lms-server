import express from 'express';
import { createTool, deleteTool, getToolById, getTools, updateTool } from '../controllers/ToolController.js';

const router = express.Router();

router.get('/api/v1/tool', getTools )
router.get('/api/v1/tool/:id', getToolById)
router.post('/api/v1/tool', createTool)
router.put('/api/v1/tool/:id', updateTool)
router.delete('/api/v1/tool/:id', deleteTool)

export default router