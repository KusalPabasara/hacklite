const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const addStory = async ({ user_id, career_title, quote, full_story, photo_url }) => {
  const result = await pool.query(
    `INSERT INTO success_stories (user_id, career_title, quote, full_story, photo_url)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, career_title, quote, full_story, photo_url]
  );
  return result.rows[0];
};

const getVerifiedStories = async () => {
  const result = await pool.query(
    `SELECT ss.*, u.name AS user_name FROM success_stories ss
     JOIN users u ON ss.user_id = u.id
     WHERE is_verified = true
     ORDER BY id DESC`
  );
  return result.rows;
};

const listAllStories = async () => {
  const result = await pool.query(`SELECT * FROM success_stories ORDER BY id DESC`);
  return result.rows;
};

const verifyStory = async (id) => {
  const res = await pool.query(
    `UPDATE success_stories SET is_verified = true WHERE id = $1 RETURNING *`,
    [id]
  );
  return res.rows[0];
};

module.exports = {
  addStory,
  getVerifiedStories,
  listAllStories,
  verifyStory,
};