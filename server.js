import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import sosRoutes from './routes/sosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import activityRoutes from './routes/activityRoutes.js';


dotenv.config();

connectDB();

const app = express();

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
app.use('/api/contacts', contactRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/activity', activityRoutes);


app.get('/', (req, res) => {
    res.send(`Welcome to Lifeline API`);
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



export default app;


