import express from "express";
import { createAttach, deleteAttachment, updateAttach } from "../controllers/AttachmentController.js";

const router = express.Router();

router.post('/api/v1/attachment', createAttach)
router.put('/api/v1/attachment/:id', updateAttach)
router.delete('/api/v1/attachment/:id', deleteAttachment)

export default router;