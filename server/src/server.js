import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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

// 1. Security Headers (Helmet with cross-origin resource policy for media embeds)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false // Allow modern SPA embedded video frames (YouTube/Vimeo)
}));

// 2. Rate Limiting Protection (DDoS and Brute Force mitigation)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // Stricter limit for uploads, logins, and form submissions
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this IP. Please try again later.' }
});

app.use('/api', apiLimiter);
app.use('/api/upload', strictLimiter);
app.use('/api/inquiries', strictLimiter);
app.use('/api/auth', strictLimiter);

// 3. CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, or same-origin in development)
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy: Unauthorized origin.'));
  },
  credentials: true
}));

// 4. Input Parsers with Size limits to prevent payload bombs
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 5. Serve uploaded media files statically with caching headers
app.use('/uploads', express.static(uploadsDir, {
  maxAge: '7d',
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// 6. API Routes
app.use('/api', apiRoutes);

// 7. Standardized Health Check & Uptime Monitor Endpoint
const startTime = Date.now();
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'fallback-local-store',
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
  });
});

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'FlipTheLense MERN Secure API',
    version: '1.2.0',
    healthCheck: '/health',
    endpoints: {
      settings: '/api/settings',
      portfolio: '/api/portfolio',
      reels: '/api/reels',
      inquiries: '/api/inquiries'
    }
  });
});

// 8. Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
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

// 9. Graceful Shutdown on termination signals
const server = app.listen(PORT, () => {
  console.log(`🚀 FlipTheLense Server running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});
