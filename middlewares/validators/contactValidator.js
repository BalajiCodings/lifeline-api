import { body } from 'express-validator';

export const contactValidator = [
    body('name').notEmpty().withMessage('Contact name is required'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
    body('relation').notEmpty().withMessage('Relation is required')
];

