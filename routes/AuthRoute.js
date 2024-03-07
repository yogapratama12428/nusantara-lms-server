import express from "express";
import { login, logout, testToken } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/api/v1/sign-in", login);
router.post("/api/v1/sign-out", logout);
router.get("/api/v1/test-token", testToken);

export default router;
