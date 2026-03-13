import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDatabase } from './lib/database';
import interviewRoutes from './routes/interview.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/interviews', interviewRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Start server — listen FIRST so Render detects the port, then connect DB
const port = env.PORT;

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${port}`);
  
  // Connect to database after server is listening
  connectDatabase()
    .then(() => console.log('✅ Database connected'))
    .catch((err) => console.error('❌ Database connection failed:', err));
});

export default app;
