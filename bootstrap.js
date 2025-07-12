// db/bootstrap.js
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
} = process.env;

const client = new Client({
  host: PG_HOST,
  port: +PG_PORT,
  user: PG_USER,
  password: PG_PASSWORD,
  database: "postgres", // connect to default system DB
});

async function createDatabaseIfNotExists() {
  try {
    await client.connect();

    const res = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = '${PG_DATABASE}';
    `);

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${PG_DATABASE}"`);
      console.log(`✅ Database "${PG_DATABASE}" created.`);
    } else {
      console.log(`✅ Database "${PG_DATABASE}" already exists.`);
    }

    await client.end();
  } catch (err) {
    console.error("❌ Error creating database:", err.message);
    process.exit(1);
  }
}

createDatabaseIfNotExists();
