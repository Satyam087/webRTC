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

// Start server
const start = async (): Promise<void> => {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
};

start().catch(console.error);

export default app;
