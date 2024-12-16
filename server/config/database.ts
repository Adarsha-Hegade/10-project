import mongoose from 'mongoose';
import { config } from './env';

const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4 // Force IPv4
};

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(config.database.uri, dbConfig);
    
    // Log connection string (without credentials) for debugging
    const dbName = conn.connection.name;
    const host = conn.connection.host;
    console.log(`✅ Connected to MongoDB: ${host}/${dbName}`);
    
    isConnected = true;
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    isConnected = false;
    return false;
  }
}

export function getDatabaseStatus() {
  return mongoose.connection.readyState === 1;
}

mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
  isConnected = false;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
  isConnected = false;
});

// Handle process termination
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