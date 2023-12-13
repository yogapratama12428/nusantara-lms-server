import express from "express";
import { getUsers } from "../controllers/UserController.js";


const router = express.Router()

router.get('/api/v1/users', getUsers)


export default router