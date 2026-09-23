import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Dynamically resolves DATABASE_URL across Vercel, Cloudflare, and local dev.
 */
export function getConnectionString(runtimeEnv) {
  const connectionString = runtimeEnv?.DATABASE_URL || process.env.DATABASE_URL;

  if (!connectionString || connectionString.includes('your_password_here')) {
    throw new Error(
      '[Database Error]: DATABASE_URL is missing or contains placeholder values. ' +
      'Check your .env.local, Vercel Env Vars, or Cloudflare Secrets.'
    );
  }

  return connectionString;
}

/**
 * Creates a Drizzle instance dynamically on demand.
 */
export function getDb(runtimeEnv) {
  const connectionString = getConnectionString(runtimeEnv);
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

/**
 * Universal export for Server Components, Actions, and Route Handlers.
 */
export const db = new Proxy({}, {
  get(target, prop) {
    const instance = getDb();
    const value = instance[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export * from './schema';