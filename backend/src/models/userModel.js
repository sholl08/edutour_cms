const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(data) {
    const { nama, email, password } = data;
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)',
      [nama, email, hashed]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.query('SELECT id, nama, email, role, created_at FROM users ORDER BY created_at DESC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT id, nama, email, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}

module.exports = User;