import express from "express";
import { createPayment } from "../controllers/PaymentController.js";

const router = express.Router();

router.post('/api/v1/checkout', createPayment);

export default router;