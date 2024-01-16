import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/CategoryController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/api/v1/category', verifyToken, getCategory)
router.get('/api/v1/category/:id', verifyToken, getCategoryById)
router.post('/api/v1/category', verifyToken,createCategory)
router.put('/api/v1/category/:id',verifyToken, updateCategory)
router.delete('/api/v1/category/:id', verifyToken,deleteCategory)

export default router