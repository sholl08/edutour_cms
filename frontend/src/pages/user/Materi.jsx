import React, { useEffect, useState } from 'react';
import { FiBook, FiMapPin } from 'react-icons/fi';
import { materiService } from '../../services/api';
import { CardSkeleton } from '../../components/Skeleton';

const Materi = () => {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMateri();
  }, []);

  const fetchMateri = async () => {
    try {
      const response = await materiService.getPublic();
      setMateri(response.data);
    } catch (error) {
      console.error('Error fetching materi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Materi Edukasi</h1>
      <CardSkeleton />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Materi Edukasi
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Pelajari sejarah, budaya, dan informasi menarik tentang berbagai destinasi wisata
        </p>
      </div>

      {/* Materi Grid */}
      {materi.length === 0 ? (
        <div className="text-center py-12">
          <FiBook size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Belum ada materi edukasi tersedia</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materi.map((item) => (
            <div
              key={item.id}
              className="card hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={`http://localhost:7777/uploads/materi/${item.media}`}
                  alt={item.judul}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                  <FiMapPin className="inline mr-1" size={12} />
                  {item.nama_destinasi || 'Destinasi'}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.judul}</h3>
                <p className="text-gray-700 leading-relaxed">{item.isi}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Materi;
