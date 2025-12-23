// SQLite Database Connection (Quick Fix)
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create SQLite database file
const dbPath = path.join(__dirname, '../metamind.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at:', dbPath);
  }
});

// Enable foreign key support
db.run('PRAGMA foreign_keys = ON');

// Wrapper functions to mimic PostgreSQL pool interface
const pool = {
  query: (text, params = []) => {
    return new Promise((resolve, reject) => {
      // Convert PostgreSQL syntax to SQLite
      let sqliteQuery = text
        .replace(/\$(\d+)/g, '?') // Replace $1, $2, etc. with ?
        .replace(/SERIAL PRIMARY KEY/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT')
        .replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP/gi, 'DATETIME DEFAULT CURRENT_TIMESTAMP')
        .replace(/TIMESTAMP/gi, 'DATETIME')
        .replace(/JSONB/gi, 'TEXT')
        .replace(/TEXT\[\]/gi, 'TEXT')
        .replace(/VARCHAR\(\d+\)/gi, 'TEXT')
        .replace(/NUMERIC\(\d+,\d+\)/gi, 'REAL')
        .replace(/BOOLEAN/gi, 'INTEGER')
        .replace(/ON DELETE CASCADE/gi, '')
        .replace(/ON CONFLICT[^;]*;/gi, ';'); // Remove ON CONFLICT clauses for now

      // Handle different query types
      if (text.toUpperCase().includes('SELECT') || text.toUpperCase().includes('WITH')) {
        db.all(sqliteQuery, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve({ rows: rows || [] });
          }
        });
      } else if (text.toUpperCase().includes('INSERT') && text.toUpperCase().includes('RETURNING')) {
        // Handle INSERT with RETURNING
        const insertQuery = sqliteQuery.replace(/RETURNING.*$/i, '');
        db.run(insertQuery, params, function(err) {
          if (err) {
            reject(err);
          } else {
            // Determine table name from query
            const tableMatch = insertQuery.match(/INSERT INTO\s+(\w+)/i);
            const tableName = tableMatch ? tableMatch[1] : 'users';

            // Get the inserted row
            db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [this.lastID], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve({ rows: row ? [{ ...row, id: this.lastID }] : [] });
              }
            });
          }
        });
      } else {
        // INSERT, UPDATE, DELETE
        db.run(sqliteQuery, params, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              rows: [],
              rowCount: this.changes,
              lastID: this.lastID
            });
          }
        });
      }
    });
  },

  connect: () => {
    return {
      query: pool.query,
      release: () => {}
    };
  }
};

module.exports = pool;