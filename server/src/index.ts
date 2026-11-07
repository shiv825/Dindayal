import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);
app.use(express.json());

// API health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Dindayal Jute & Craft API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`🌿 Dindayal Express Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints active at http://localhost:${PORT}/api/`);
});

export default app;

