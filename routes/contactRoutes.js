import express from 'express';
import {
    createContact,
    getContacts,
    updateContact,
    deleteContact
} from '../controllers/contactController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { contactValidator } from '../middlewares/validators/contactValidator.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

router.post('/', authMiddleware, contactValidator, validateRequest, createContact);
router.get('/', authMiddleware, getContacts);
router.put('/:id', authMiddleware, contactValidator, validateRequest, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

export default router;