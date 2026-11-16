import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import { seedInitialData } from './seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'FlipTheLense MERN Backend API',
    endpoints: {
      settings: '/api/settings',
      portfolio: '/api/portfolio',
      reels: '/api/reels',
      services: '/api/services',
      inquiries: '/api/inquiries'
    }
  });
});

// Database connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas successfully.');
    await seedInitialData();
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning:', err.message);
    console.log('👉 Make sure to add your MongoDB Atlas URI in server/.env when ready!');
  });

app.listen(PORT, () => {
  console.log(`🚀 FlipTheLense Server running on http://localhost:${PORT}`);
});
