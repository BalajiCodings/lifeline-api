import express from 'express';
import { triggerSOS } from '../controllers/sosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import sosLimiter from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/', authMiddleware, sosLimiter, triggerSOS);

export default router;