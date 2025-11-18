const db = require('../config/db');

class Review {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT r.*, u.nama AS nama_user, d.nama_destinasi 
      FROM review r
      JOIN users u ON r.user_id = u.id
      JOIN destinasi d ON r.destinasi_id = d.id
      ORDER BY r.created_at DESC
    `);
    return rows;
  }

  static async getByDestinasi(destinasi_id) {
    const [rows] = await db.query(`
      SELECT r.*, u.nama AS nama_user 
      FROM review r
      JOIN users u ON r.user_id = u.id
      WHERE r.destinasi_id = ?
      ORDER BY r.created_at DESC
    `, [destinasi_id]);
    return rows;
  }

  static async create(data) {
    const { user_id, destinasi_id, rating, komentar } = data;
    const [result] = await db.query(
      'INSERT INTO review (user_id, destinasi_id, rating, komentar) VALUES (?, ?, ?, ?)',
      [user_id, destinasi_id, rating, komentar]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { rating, komentar } = data;
    await db.query(
      'UPDATE review SET rating = ?, komentar = ? WHERE id = ?',
      [rating, komentar, id]
    );
    return true;
  }

  static async delete(id) {
    await db.query('DELETE FROM review WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Review;