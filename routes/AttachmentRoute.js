import express from "express";
import { createAttach, deleteAttachment, updateAttach } from "../controllers/AttachmentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/api/v1/attachment', verifyToken, createAttach)
router.put('/api/v1/attachment/:id', verifyToken, updateAttach)
router.delete('/api/v1/attachment/:id', verifyToken, deleteAttachment)

export default router;