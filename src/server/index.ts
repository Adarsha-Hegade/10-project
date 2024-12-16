import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { connectToDatabase } from './config/database';
import { authRouter } from './routes/auth';
import { productRouter } from './routes/products';
import { errorHandler } from './middleware/error';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

// Error handling
app.use(errorHandler);

// Initialize server
async function startServer() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log('✅ Database connection established');

    // Start server
    const port = config.server.port;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start server
startServer();

export default app;