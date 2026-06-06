import mysql from "mysql2/promise";

// Singleton pool — reused across requests in the same process
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  waitForConnections: true,
  connectionLimit: 5,
  supportBigNumbers: true,
  bigNumberStrings: true, // return BIGINT as string to avoid JS precision loss
});

export default pool;
