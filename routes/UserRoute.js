import express from "express";
import { getUsers } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.get('/api/v1/users', verifyToken, getUsers)


export default router