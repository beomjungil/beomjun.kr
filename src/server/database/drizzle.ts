import { drizzle } from 'drizzle-orm/d1';

export function createDrizzle(database: D1Database) {
  return drizzle(database);
}

export type Database = ReturnType<typeof createDrizzle>;
