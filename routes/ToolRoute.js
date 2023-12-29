import express from 'express';
import { createTool, deleteTool, getToolById, getTools, updateTool } from '../controllers/ToolController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/api/v1/tool', verifyToken, getTools )
router.get('/api/v1/tool/:id',verifyToken, getToolById)
router.post('/api/v1/tool', verifyToken,createTool)
router.put('/api/v1/tool/:id', verifyToken,updateTool)
router.delete('/api/v1/tool/:id', verifyToken, deleteTool)

export default router