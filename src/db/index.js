import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let _dbInstance = null;

/**
 * Lazily initialize and return the Drizzle Neon client.
 * This prevents static build crashes if DATABASE_URL is not yet defined in the environment.
 */
export function getDb() {
  if (!_dbInstance) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString || connectionString.includes('your_password_here')) {
      throw new Error(
        'DATABASE_URL is not set or contains placeholder values. Please update your .env.local file with your Neon PostgreSQL connection string.'
      );
    }
    const sql = neon(connectionString);
    _dbInstance = drizzle(sql, { schema });
  }
  return _dbInstance;
}

/**
 * Direct db export for queries: e.g. await db.select().from(inquiries)
 */
export const db = new Proxy({}, {
  get(target, prop) {
    const instance = getDb();
    const value = instance[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export * from './schema';
