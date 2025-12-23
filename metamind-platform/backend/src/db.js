// Database connection - automatically detects and uses SQLite for quick setup
require("dotenv").config();

// Check if we should use SQLite (for quick setup) or PostgreSQL
const useSQLite = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('mydb') || process.env.USE_SQLITE === 'true';

let pool;

if (useSQLite) {
  console.log('🔧 Using SQLite database for quick setup...');
  pool = require('./db-sqlite');
} else {
  console.log('🐘 Using PostgreSQL database...');
  const { Pool } = require("pg");
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  });
}

module.exports = pool;