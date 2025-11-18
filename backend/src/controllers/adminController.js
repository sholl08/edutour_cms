// =============================
// 📁 CONTROLLER: adminController.js
// =============================

// Import library
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Koneksi MySQL (pakai mysql2/promise)

// 🔐 Secret key JWT dari .env
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// =============================
// 🔸 REGISTER / TAMBAH ADMIN
// =============================
exports.create = async (req, res) => {
  try {
    // Debug untuk cek apakah body terbaca
    console.log('📩 req.body:', req.body);

    const { nama, email, password, role } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
    }

    // Cek apakah email sudah digunakan
    const [check] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (check.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    await db.query(
      'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
      [nama, email, hashedPassword, role || 'admin']
    );

    res.status(201).json({ message: '✅ Admin berhasil ditambahkan' });
  } catch (error) {
    console.error('❌ Error saat membuat admin:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// =============================
// 🔸 LOGIN ADMIN
// =============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // Cek user berdasarkan email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    const admin = rows[0];

    // Cek password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '2h' } // token berlaku 2 jam
    );

    res.status(200).json({
      message: '✅ Login berhasil',
      token,
      user: {
        id: admin.id,
        nama: admin.nama,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('❌ Error login admin:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// =============================
// 🔸 GET SEMUA ADMIN
// =============================
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nama, email, role, created_at FROM users WHERE role = "admin"'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Error ambil admin:', error);
    res.status(500).json({ message: 'Gagal mengambil data admin' });
  }
};

// =============================
// 🔸 UPDATE ADMIN
// =============================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password } = req.body;

    let query = 'UPDATE users SET nama=?, email=?';
    const params = [nama, email];

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query += ', password=?';
      params.push(hashed);
    }

    query += ' WHERE id=?';
    params.push(id);

    await db.query(query, params);
    res.status(200).json({ message: '✅ Admin berhasil diperbarui' });
  } catch (error) {
    console.error('❌ Error update admin:', error);
    res.status(500).json({ message: 'Gagal memperbarui admin' });
  }
};

// =============================
// 🔸 DELETE ADMIN
// =============================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM users WHERE id=? AND role="admin"', [id]);
    res.status(200).json({ message: '✅ Admin berhasil dihapus' });
  } catch (error) {
    console.error('❌ Error hapus admin:', error);
    res.status(500).json({ message: 'Gagal menghapus admin' });
  }
};