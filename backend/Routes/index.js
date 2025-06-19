import express from 'express';
import userRoutes from './user.routes.js';

const router = express.Router();

router.post("/user",userRoutes)

export default router;