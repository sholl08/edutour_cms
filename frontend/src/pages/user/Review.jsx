import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiStar } from 'react-icons/fi';
import { destinasiService, reviewService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Review = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [destinasiList, setDestinasiList] = useState([]);
  const [formData, setFormData] = useState({
    id_destinasi: '',
    rating: 5,
    komentar: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('Silakan login terlebih dahulu untuk memberikan review');
      navigate('/login');
      return;
    }
    fetchDestinasi();
  }, [token, navigate]);

  const fetchDestinasi = async () => {
    try {
      const response = await destinasiService.getAll();
      setDestinasiList(response.data);
    } catch (error) {
      toast.error('Gagal memuat data destinasi');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_destinasi) {
      toast.error('Pilih destinasi terlebih dahulu');
      return;
    }

    setSubmitting(true);

    try {
      await reviewService.create(formData.id_destinasi, {
        rating: parseInt(formData.rating),
        komentar: formData.komentar,
      });
      toast.success('Review berhasil dikirim. Terima kasih atas feedback Anda!');
      setFormData({
        id_destinasi: '',
        rating: 5,
        komentar: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengirim review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Berikan Review
          </h1>
          <p className="text-gray-600 text-lg">
            Bagikan pengalaman Anda dan bantu pengunjung lain membuat keputusan
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card">
          {/* Destinasi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Destinasi *
            </label>
            <select
              name="id_destinasi"
              value={formData.id_destinasi}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">-- Pilih Destinasi --</option>
              {destinasiList.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.nama_destinasi}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <FiStar
                    size={32}
                    className={
                      star <= formData.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
              <span className="ml-3 text-lg font-semibold text-gray-700">
                {formData.rating} / 5
              </span>
            </div>
          </div>

          {/* Komentar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Komentar *
            </label>
            <textarea
              name="komentar"
              value={formData.komentar}
              onChange={handleChange}
              placeholder="Ceritakan pengalaman Anda mengunjungi destinasi ini..."
              rows="6"
              className="input-field"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:opacity-50"
          >
            {submitting ? 'Mengirim...' : 'Kirim Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
