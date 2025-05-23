import { body } from 'express-validator';

export const registerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 charaters'),
];

export const loginVaidator = [
    body('email').isEmail().withMessage('valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

