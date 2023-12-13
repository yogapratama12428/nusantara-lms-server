import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.get('/api/v1/category', getCategory)
router.get('/api/v1/category/:id', getCategoryById)
router.post('/api/v1/category', createCategory)
router.put('/api/v1/category/:id', updateCategory)
router.delete('/api/v1/category/:id', deleteCategory)

export default router