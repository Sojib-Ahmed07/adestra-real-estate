import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load variables from .env.local first, falling back to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

export default defineConfig({
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
