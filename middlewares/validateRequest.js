import { validateResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
    const errors = validateResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
};