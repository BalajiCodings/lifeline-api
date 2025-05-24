import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUserActivityLogs } from '../controllers/activityController.js';

const router = express.Router();

router.get('/', authMiddleware, getUserActivityLogs);

export default router;
