import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'lib/db/schema.ts',
  out: 'lib/db/drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? '',
    port: Number(process.env.DB_PORT) ?? 1111,
  },
});
