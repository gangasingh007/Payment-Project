import express from 'express';
import userRoutes from './user.routes.js';
import { authMiddleware } from '../Middlewares/user.middleware.js';

const router = express.Router();

router.post("/user",authMiddleware, userRoutes)

export default router;