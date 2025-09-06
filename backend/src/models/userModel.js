const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createUser = async ({ name, email, password, role, language }) => {
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role, language)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, role, language]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};