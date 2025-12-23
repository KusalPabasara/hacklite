const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getMentors = async () => {
  const res = await pool.query("SELECT * FROM mentors ORDER BY id DESC");
  return res.rows;
};

const addMentor = async ({ name, bio, expertise, photo_url }) => {
  const res = await pool.query(
    `INSERT INTO mentors (name, bio, expertise, photo_url)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, bio, expertise, photo_url]
  );
  return res.rows[0];
};

const requestMentorship = async (user_id, mentor_id, note) => {
  const res = await pool.query(
    `INSERT INTO mentor_requests (user_id, mentor_id, note)
     VALUES ($1, $2, $3) RETURNING *`,
    [user_id, mentor_id, note]
  );
  return res.rows[0];
};

const getRequestsByMentor = async (mentor_id) => {
  const res = await pool.query(
    `SELECT mr.*, u.name as user_name FROM mentor_requests mr
     JOIN users u ON mr.user_id = u.id
     WHERE mentor_id = $1`,
     [mentor_id]
  );
  return res.rows;
};

module.exports = {
  getMentors,
  addMentor,
  requestMentorship,
  getRequestsByMentor,
};