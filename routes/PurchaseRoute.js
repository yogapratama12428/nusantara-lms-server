import express from "express";
import {
  createPurchase,
  deletePurchase,
  getPurchase,
  getPurchaseById,
  updatePurchase,
  updatePurchaseById,
} from "../controllers/PurchaseController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/api/v1/purchase", verifyToken, getPurchase);
router.get(
  "/api/v1/purchase/:userId",
  verifyToken,
  verifyUser,
  getPurchaseById
);
router.post("/api/v1/purchase", verifyUser, verifyToken, createPurchase);
router.put("/api/v1/purchase/:userId", verifyUser, verifyToken, updatePurchase);
router.put(
  "/api/v1/purchase/progress/:id",
  verifyUser,
  verifyToken,
  updatePurchaseById
);
router.delete("/api/v1/purchase/:id", verifyUser, verifyToken, deletePurchase);

export default router;
