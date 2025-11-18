const db = require('../config/db');

class Destinasi {
  // Tambah destinasi
  static tambah(data) {
    const sql = `
      INSERT INTO destinasi (nama_destinasi, deskripsi, lokasi, latitude, longitude, gambar, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.nama_destinasi, 
      data.deskripsi, 
      data.lokasi, 
      data.latitude, 
      data.longitude, 
      data.gambar, 
      data.created_by
    ];
    return db.query(sql, values);
  }

  // Update destinasi
  static update(id, data) {
    const sql = `
      UPDATE destinasi 
      SET nama_destinasi = ?, deskripsi = ?, lokasi = ?, latitude = ?, longitude = ?, gambar = ?
      WHERE id = ?
    `;
    const values = [
      data.nama_destinasi, 
      data.deskripsi, 
      data.lokasi, 
      data.latitude, 
      data.longitude, 
      data.gambar, 
      id
    ];
    return db.query(sql, values);
  }

  // Hapus destinasi
  static hapus(id) {
    return db.query('DELETE FROM destinasi WHERE id = ?', [id]);
  }

  // Ambil semua destinasi
  static getAll() {
    return db.query('SELECT * FROM destinasi ORDER BY id DESC');
  }

  // Ambil detail destinasi
  static getById(id) {
    return db.query('SELECT * FROM destinasi WHERE id = ?', [id]);
  }
}

module.exports = Destinasi;