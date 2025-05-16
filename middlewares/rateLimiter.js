import rateLimit from 'express-rate-limit';

const sosLimiter = rateLimit({ 
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: {
        message: 'Too many SOS alerts sent. Try again later balaji.'
    }
});

export default sosLimiter;
