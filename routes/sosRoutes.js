import express from 'express';
import { triggerSOS } from '../controllers/sosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import sosLimiter from '../middlewares/rateLimiter.js';
import { getSOSHistory } from '../controllers/sosController.js';

const router = express.Router();

router.post('/', authMiddleware, sosLimiter, triggerSOS);
router.get('/history', authMiddleware, getSOSHistory);

export default router;