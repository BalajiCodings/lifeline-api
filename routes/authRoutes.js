import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../middlewares/validators/authValidator.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

router.post('/register', registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, loginUser);

export default router;