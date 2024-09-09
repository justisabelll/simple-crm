import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;
let db: ReturnType<typeof drizzle> | null = null;

async function createConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'host',
      user: process.env.DB_USER || 'user',
      database: process.env.DB_NAME || 'database',
      password: process.env.DB_PASSWORD || 'password',
      port: Number(process.env.DB_PORT) || 1111,
    });
  }
  return connection;
}

export async function getDb() {
  if (!db) {
    const conn = await createConnection();
    db = drizzle(conn);
  }
  return db;
}

export { db };
