import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiMapPin, FiArrowLeft, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { destinasiService, reviewService, materiService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DestinasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destinasi, setDestinasi] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    komentar: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      console.log('Fetching destinasi with ID:', id);
      const destResponse = await destinasiService.getById(id);
      console.log('Destinasi response:', destResponse);
      
      // Handle nested data response
      const destData = destResponse.data?.data || destResponse.data;
      console.log('Destinasi data:', destData);
      
      if (!destData) {
        throw new Error('Data destinasi kosong');
      }
      
      setDestinasi(destData);
      
      // Fetch reviews and materi
      try {
        const reviewResponse = await reviewService.getByDestinasi(id);
        setReviews(Array.isArray(reviewResponse.data) ? reviewResponse.data : []);
      } catch (err) {
        console.warn('Error fetching reviews:', err);
        setReviews([]);
      }
      
      try {
        const materiResponse = await materiService.getByDestinasi(id);
        setMateri(Array.isArray(materiResponse.data) ? materiResponse.data : []);
      } catch (err) {
        console.warn('Error fetching materi:', err);
        setMateri([]);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Gagal memuat data destinasi');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Silakan login terlebih dahulu untuk memberikan review');
      navigate('/login');
      return;
    }

    if (!reviewForm.komentar.trim()) {
      toast.error('Komentar tidak boleh kosong');
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.create(id, reviewForm);
      toast.success('Review berhasil ditambahkan!');
      setReviewForm({ rating: 5, komentar: '' });
      fetchData(); // Refresh reviews
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menambahkan review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        size={16}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) return <LoadingSpinner />;
  if (!destinasi) return <div className="text-center py-12">Destinasi tidak ditemukan</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/destinasi')}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition"
      >
        <FiArrowLeft />
        <span>Kembali ke Destinasi</span>
      </button>

      {/* Hero Image */}
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
        <img
          src={`http://localhost:7777/uploads/destinasi/${destinasi.gambar}`}
          alt={destinasi.nama_destinasi}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-5xl font-bold mb-2">{destinasi.nama_destinasi}</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <FiMapPin />
              {destinasi.lokasi}
            </span>
            {reviews.length > 0 && (
              <span className="flex items-center gap-2">
                <FiStar className="fill-yellow-400 text-yellow-400" />
                {averageRating} ({reviews.length} review)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Destinasi</h2>
            <p className="text-gray-700 leading-relaxed">{destinasi.deskripsi}</p>
          </div>

          {/* Map */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lokasi</h2>
            <div className="h-80 rounded-xl overflow-hidden">
              <MapContainer
                center={[parseFloat(destinasi.latitude), parseFloat(destinasi.longitude)]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[parseFloat(destinasi.latitude), parseFloat(destinasi.longitude)]}>
                  <Popup>{destinasi.nama_destinasi}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Reviews */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Pengunjung</h2>
            
            {/* Form Review - Hanya untuk user yang login */}
            {token && user.role === 'user' && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Berikan Review Anda</h3>
                
                {/* Rating Stars */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <FiStar
                          size={32}
                          className={
                            star <= reviewForm.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-200'
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600 self-center">
                      {reviewForm.rating} bintang
                    </span>
                  </div>
                </div>

                {/* Komentar */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komentar
                  </label>
                  <textarea
                    value={reviewForm.komentar}
                    onChange={(e) => setReviewForm({ ...reviewForm, komentar: e.target.value })}
                    placeholder="Ceritakan pengalaman Anda di destinasi ini..."
                    rows="4"
                    className="input-field"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary disabled:opacity-50"
                >
                  {submitting ? 'Mengirim...' : 'Kirim Review'}
                </button>
              </form>
            )}

            {/* Login prompt untuk user yang belum login */}
            {!token && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-gray-700 mb-3">
                  Ingin memberikan review untuk destinasi ini?
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary"
                >
                  Login Sekarang
                </button>
              </div>
            )}

            {/* List Reviews */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Belum ada review. Jadilah yang pertama memberikan review!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-800">{review.nama}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.komentar}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Materi */}
          <div className="card sticky top-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Materi Edukasi</h3>
            {materi.length === 0 ? (
              <p className="text-gray-500 text-sm">Belum ada materi tersedia.</p>
            ) : (
              <div className="space-y-3">
                {materi.map((item) => (
                  <div key={item.id_materi} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <h4 className="font-semibold text-gray-800 mb-1">{item.judul}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.konten}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinasiDetail;
