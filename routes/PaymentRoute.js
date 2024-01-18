import express from "express";
import { createPayment } from "../controllers/PaymentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/transactions/notification', createPayment);

export default router;