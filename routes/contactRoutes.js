import express from 'express';
import {
    createContact,
    getContacts,
    updateContact,
    deleteContact
} from '../controllers/contactController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;