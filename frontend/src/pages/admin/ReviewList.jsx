import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FiStar, FiTrash2 } from 'react-icons/fi';
import { reviewService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getAll();
      console.log('Review response:', response.data);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Gagal memuat data review');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, destinasi) => {
    const result = await Swal.fire({
      title: 'Hapus Review?',
      text: `Apakah Anda yakin ingin menghapus review untuk "${destinasi}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await reviewService.delete(id);
        toast.success('Review berhasil dihapus');
        fetchReviews();
      } catch (error) {
        toast.error('Gagal menghapus review');
      }
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

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kelola Review</h1>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <FiStar size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Belum ada review dari pengguna.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card hover:shadow-lg transition flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-gray-800">
                    {review.nama_user || 'Anonymous'}
                  </h3>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Destinasi: <span className="font-semibold">{review.nama_destinasi}</span>
                </p>
                <p className="text-gray-700">{review.komentar}</p>
              </div>
              <button
                onClick={() => handleDelete(review.id, review.nama_destinasi)}
                className="btn-danger ml-4"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
