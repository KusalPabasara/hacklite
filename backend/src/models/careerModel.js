const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getAllCareers = async () => {
  const result = await pool.query("SELECT * FROM careers ORDER BY id ASC");
  return result.rows;
};

const getCareerById = async (id) => {
  const result = await pool.query("SELECT * FROM careers WHERE id = $1", [id]);
  return result.rows[0];
};

const createCareer = async ({ title, category, description, roadmap }) => {
  const result = await pool.query(
    `INSERT INTO careers (title, category, description, roadmap)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, category, description, roadmap]
  );
  return result.rows[0];
};

const updateCareer = async (id, { title, category, description, roadmap }) => {
  const result = await pool.query(
    `UPDATE careers
      SET title = $1, category = $2, description = $3, roadmap = $4
      WHERE id = $5 RETURNING *`,
    [title, category, description, roadmap, id]
  );
  return result.rows[0];
};

const deleteCareer = async (id) => {
  await pool.query("DELETE FROM careers WHERE id = $1", [id]);
};

module.exports = {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
};