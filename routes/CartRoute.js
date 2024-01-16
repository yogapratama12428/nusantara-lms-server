import express from "express";
import { createCart, deleteCart, getCart, getCartById, updateCart } from "../controllers/CartController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import apicache from 'apicache'

const router = express.Router();
let cache = apicache.middleware

router.get('/api/v1/cart', verifyToken, getCart);
router.get('/api/v1/cart/:id', verifyToken, getCartById);
router.post('/api/v1/cart', verifyToken, createCart);
router.put('/api/v1/cart/:id', verifyToken, updateCart);
router.delete('/api/v1/cart/:id', verifyToken, deleteCart);


export default router