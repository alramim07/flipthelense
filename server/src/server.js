import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import { seedInitialData } from './seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded media files statically
app.use('/uploads', express.static(uploadsDir));

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
