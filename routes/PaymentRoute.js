import express from "express";
import { createPayment } from "../controllers/PaymentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/api/v1/checkout', verifyToken, createPayment);

export default router;