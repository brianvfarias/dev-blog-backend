import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import process from 'process';
import { articles } from './schema.ts';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
});

await client.connect();
export const db = drizzle(client, { schema: { articles } });
