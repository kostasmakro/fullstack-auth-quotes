const db = require("./db");

// CREATE
function createUser(email, passwordHash) {
  const stmt = db.prepare(`
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `);

  const info = stmt.run(email, passwordHash);
  return { id: info.lastInsertRowid, email };
}

// READ by email (for login)
function getUserByEmail(email) {
  const stmt = db.prepare(`
    SELECT id, email, password, created_at
    FROM users
    WHERE email = ?
  `);

  return stmt.get(email); // returns undefined if not found
}

// READ by id (for /auth/me)
function getUserById(id) {
  const stmt = db.prepare(`
    SELECT id, email, created_at
    FROM users
    WHERE id = ?
  `);

  return stmt.get(id);
}

module.exports = { createUser, getUserByEmail, getUserById };