import express from "express";
import { createCart, deleteCart, getCart, getCartById, updateCart } from "../controllers/CartController.js";

const router = express.Router();

router.get('/api/v1/cart', getCart);
router.get('/api/v1/cart/:id', getCartById);
router.post('/api/v1/cart', createCart);
router.put('/api/v1/cart/:id', updateCart);
router.delete('/api/v1/cart/:id', deleteCart);


export default router