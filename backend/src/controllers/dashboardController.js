const db = require('../config/db');

// Ambil ringkasan data untuk dashboard admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Jalankan query paralel biar cepat
    const [
      [destinasiCount],
      [materiCount],
      [userCount],
      [reviewCount]
    ] = await Promise.all([
      db.query('SELECT COUNT(*) AS total_destinasi FROM destinasi'),
      db.query('SELECT COUNT(*) AS total_materi FROM materi'),
      db.query('SELECT COUNT(*) AS total_user FROM users'),
      db.query('SELECT COUNT(*) AS total_review FROM review'),
    ]);

    const data = {
      totalDestinasi: destinasiCount[0].total_destinasi,
      totalMateri: materiCount[0].total_materi,
      totalUsers: userCount[0].total_user,
      totalReview: reviewCount[0].total_review,
    };

    res.status(200).json(data);
  } catch (err) {
    console.error('Gagal mengambil data dashboard:', err);
    res.status(500).json({ message: 'Gagal mengambil data dashboard' });
  }
};