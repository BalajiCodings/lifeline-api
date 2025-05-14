import express from 'express';
import { triggerSOS } from '../controllers/sosController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, triggerSOS);

export default router;