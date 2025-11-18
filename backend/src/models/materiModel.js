const db = require('../config/db');

// Model Materi
const Materi = {
  // Ambil semua materi dengan JOIN destinasi
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT m.*, d.nama_destinasi 
      FROM materi m
      LEFT JOIN destinasi d ON m.destinasi_id = d.id
      ORDER BY m.created_at DESC
    `);
    return rows;
  },

  // Ambil materi berdasarkan ID destinasi
  getByDestinasi: async (destinasi_id) => {
    const [rows] = await db.query(
      'SELECT * FROM materi WHERE destinasi_id = ? ORDER BY created_at DESC', 
      [destinasi_id]
    );
    return rows;
  },

  // Ambil single materi by ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM materi WHERE id = ?', [id]);
    return rows[0];
  },

  // Tambah data materi baru
  create: async (data) => {
    const [result] = await db.query(
      'INSERT INTO materi (destinasi_id, judul, isi, media) VALUES (?, ?, ?, ?)',
      [data.destinasi_id, data.judul, data.isi, data.media]
    );
    return result;
  },

  // Update data materi
  update: async (id, data) => {
    const [result] = await db.query(
      'UPDATE materi SET judul=?, isi=?, media=? WHERE id=?',
      [data.judul, data.isi, data.media, id]
    );
    return result;
  },

  // Hapus materi
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM materi WHERE id=?', [id]);
    return result;
  },
};

module.exports = Materi;