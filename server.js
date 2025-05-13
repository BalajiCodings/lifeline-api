import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from '../routes/authRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later."
});
app.use(limiter);

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send(`Welcome to Lifeline API`);
});

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


