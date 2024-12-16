import mongoose from 'mongoose';
import { config } from '../config';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(config.database.uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('✅ Connected to MongoDB successfully');

    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('❌ MongoDB disconnected');
      isConnected = false;
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    isConnected = false;
    throw error;
  }
}

export function getConnectionStatus() {
  return isConnected;
}

export async function waitForConnection(timeout: number = 5000): Promise<boolean> {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    if (isConnected) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return false;
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});