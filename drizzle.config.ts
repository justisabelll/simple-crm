import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'lib/db/schema.ts',
  out: 'lib/db/drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DB_URL ?? '',
  },
});
