import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { articles } from './schema.ts';
import { env } from './env/index.ts';

const client = new pg.Client({
  connectionString: env.POSTGRES_URL,
});

await client.connect();
export const db = drizzle(client, { schema: { articles } });
