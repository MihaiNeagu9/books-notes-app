import pg from "pg";

const { Pool } = pg;

// Singleton pool (a single connection/pool for the application)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Debugging
pool.on("error", (err) => {
  console.error("Unexpected PG pool error:", err);
});

export default pool;
