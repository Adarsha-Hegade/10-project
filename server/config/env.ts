import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  PORT: z.string().default('3001'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.toString());
  process.exit(1);
}

export const config = {
  database: {
    uri: env.data.MONGODB_URI,
  },
  jwt: {
    secret: env.data.JWT_SECRET,
    expiresIn: '24h',
  },
  server: {
    port: parseInt(env.data.PORT, 10),
    isDevelopment: env.data.NODE_ENV === 'development',
  },
};