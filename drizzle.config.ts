import { defineConfig } from 'drizzle-kit';
import process from 'process';
import { env } from './src/env/index.ts';
export default defineConfig({
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL ?? '',
  },
  out: './drizzle',
});
