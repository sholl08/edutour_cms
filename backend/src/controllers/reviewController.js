const Review = require('../models/reviewModel');

exports.getAll = async (req, res) => {
  try {
    const data = await Review.getAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil review' });
  }
};

exports.getByDestinasi = async (req, res) => {
  try {
    const { destinasiId } = req.params;
    const data = await Review.getByDestinasi(destinasiId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal ambil review destinasi' });
  }
};

exports.create = async (req, res) => {
  try {
    const { destinasiId } = req.params;
    const userId = req.user?.id; // Dari authMiddleware
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized. Silakan login terlebih dahulu.' });
    }
    
    const reviewData = {
      user_id: userId,
      destinasi_id: destinasiId,
      rating: req.body.rating,
      komentar: req.body.komentar
    };
    
    const newId = await Review.create(reviewData);
    res.status(201).json({ success: true, message: 'Review berhasil ditambahkan', data: { id: newId } });
  } catch (err) {
    console.error('Error create review:', err);
    res.status(500).json({ message: 'Gagal menambah review' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.delete(id);
    res.status(200).json({ success: true, message: 'Review berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal hapus review' });
  }
};