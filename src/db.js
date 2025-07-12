import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
