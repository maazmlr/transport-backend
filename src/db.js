import knex from "knex";
import dotenv from "dotenv";
import config from "../knexfile.js";

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required by Render
    },
  },
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
    afterCreate: (conn, done) => {
      conn.query('SET timezone="UTC";', (err) => done(err, conn));
    },
  },
  migrations: {
    directory: "./src/db/migrations",
    tableName: "knex_migrations",
  },
});

export default db;
