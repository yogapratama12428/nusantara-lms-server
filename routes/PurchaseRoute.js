import express from "express";
import { createPurchase, deletePurchase, getPurchase, getPurchaseById, updatePurchase } from "../controllers/PurchaseController.js";

const router = express.Router();

router.get('/api/v1/purchase', getPurchase);
router.get('/api/v1/purchase/:userId', getPurchaseById);
router.post('/api/v1/purchase', createPurchase);
router.put('/api/v1/purchase/:userId', updatePurchase);
router.delete('/api/v1/purchase/:id', deletePurchase);

export default router;