export const config = {
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  database: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://magnificblr:4gphC5JgMvwF7aT3@inventory.m7seo.mongodb.net/inventory?retryWrites=true&w=majority&appName=inventory',
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    isDevelopment: process.env.NODE_ENV !== 'production',
  },
};