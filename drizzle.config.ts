import { defineConfig } from 'drizzle-kit';
import process from 'process';
export default defineConfig({
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL ?? '',
  },
  out: './drizzle',
});
