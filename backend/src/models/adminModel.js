const db = require('../config/db');

// Model untuk Admin (data diambil dari tabel `users`)
const Admin = {
  // 1️⃣ Cek login admin berdasarkan email dan password
  login: (email, password, callback) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ? AND role = 'admin'";
    db.query(sql, [email, password], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  // 2️⃣ Ambil semua data admin
  getAll: (callback) => {
    const sql = "SELECT id, nama, email, role, created_at FROM users WHERE role = 'admin'";
    db.query(sql, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  // 3️⃣ Tambah admin baru
  create: (data, callback) => {
    const sql = "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, 'admin')";
    db.query(sql, [data.nama, data.email, data.password], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  // 4️⃣ Update data admin
  update: (id, data, callback) => {
    const sql = "UPDATE users SET nama = ?, email = ?, password = ? WHERE id = ? AND role = 'admin'";
    db.query(sql, [data.nama, data.email, data.password, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  // 5️⃣ Hapus admin
  delete: (id, callback) => {
    const sql = "DELETE FROM users WHERE id = ? AND role = 'admin'";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = Admin;