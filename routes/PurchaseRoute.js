import express from "express";
import { createPurchase, deletePurchase, getPurchase, getPurchaseById, updatePurchase } from "../controllers/PurchaseController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/api/v1/purchase', verifyToken, getPurchase);
router.get('/api/v1/purchase/:userId', verifyToken, getPurchaseById);
router.post('/api/v1/purchase', verifyToken, createPurchase);
router.put('/api/v1/purchase/:userId', verifyToken, updatePurchase);
router.delete('/api/v1/purchase/:id',verifyToken, deletePurchase);

export default router;