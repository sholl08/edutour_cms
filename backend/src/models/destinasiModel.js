const db = require('../config/db');

class Destinasi {
  // Tambah destinasi
  static async create(data) {
    const sql = `
      INSERT INTO destinasi (nama_destinasi, deskripsi, kategori, lokasi, latitude, longitude, gambar, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.nama_destinasi, 
      data.deskripsi,
      data.kategori || null,
      data.lokasi, 
      data.latitude, 
      data.longitude, 
      data.gambar, 
      data.created_by
    ];
    const [result] = await db.query(sql, values);
    return result.insertId;
  }

  // Update destinasi
  static async update(id, data) {
    const sql = `
      UPDATE destinasi 
      SET nama_destinasi = ?, deskripsi = ?, kategori = ?, lokasi = ?, latitude = ?, longitude = ?, gambar = ?
      WHERE id = ?
    `;
    const values = [
      data.nama_destinasi, 
      data.deskripsi,
      data.kategori || null,
      data.lokasi, 
      data.latitude, 
      data.longitude, 
      data.gambar, 
      id
    ];
    const [result] = await db.query(sql, values);
    return result;
  }

  // Hapus destinasi
  static async delete(id) {
    const [result] = await db.query('DELETE FROM destinasi WHERE id = ?', [id]);
    return result;
  }

  // Ambil semua destinasi
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM destinasi ORDER BY created_at DESC');
    return rows;
  }

  // Ambil detail destinasi
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM destinasi WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Destinasi;