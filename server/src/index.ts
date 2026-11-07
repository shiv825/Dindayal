import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

const allowedOrigins = [
  CLIENT_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

// Production CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('dindayal') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

// API health check (used by Render/Railway zero-downtime health monitors)
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Dindayal Jute & Craft API',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome / health check
app.get('/', (_req, res) => {
  res.json({
    message: '🌿 Dindayal Jute & Craft Backend API is live!',
    health: '/api/health',
    endpoints: ['/api/products', '/api/settings', '/api/inquiries', '/api/orders', '/api/upload'],
  });
});

// Mount API Routes
app.use('/api', apiRoutes);

// Bind to 0.0.0.0 for Render, Railway, Fly.io, Heroku
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 Dindayal Express Backend running on port ${PORT}`);
  console.log(`📡 Health check active at http://0.0.0.0:${PORT}/api/health`);
});

export default app;
