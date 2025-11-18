const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi token JWT
module.exports = (req, res, next) => {
  try {
    // Ambil token dari header authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
    }

    // Format token: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token tidak valid' });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia_super_aman');

    // Simpan data user yang terverifikasi ke request
    req.user = decoded;

    // Lanjut ke proses berikutnya
    next();
  } catch (error) {
    console.error('Error verifikasi token:', error.message);
    res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
  }
};