import express from 'express';
import userRoutes from './user.routes.js';
import { authMiddleware } from '../Middlewares/user.middleware.js';
import accountRoutes from './account.routes.js';

const router = express.Router();

router.use("/user", authMiddleware, userRoutes)
router.use("/account", authMiddleware, accountRoutes);

export default router;