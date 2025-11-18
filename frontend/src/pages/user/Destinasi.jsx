import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { destinasiService } from '../../services/api';
import { CardSkeleton } from '../../components/Skeleton';

const Destinasi = () => {
  const [destinasi, setDestinasi] = useState([]);
  const [filteredDestinasi, setFilteredDestinasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDestinasi();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = destinasi.filter(
        (item) =>
          item.nama_destinasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinasi(filtered);
    } else {
      setFilteredDestinasi(destinasi);
    }
  }, [searchTerm, destinasi]);

  const fetchDestinasi = async () => {
    try {
      const response = await destinasiService.getAll();
      setDestinasi(response.data);
      setFilteredDestinasi(response.data);
    } catch (error) {
      console.error('Error fetching destinasi:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Destinasi Wisata Edukasi</h1>
      <CardSkeleton />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Destinasi Wisata Edukasi
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Jelajahi berbagai destinasi menarik dengan nilai edukasi tinggi di seluruh Indonesia
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari destinasi berdasarkan nama atau lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition"
          />
        </div>
      </div>

      {/* Destinasi Grid */}
      {filteredDestinasi.length === 0 ? (
        <div className="text-center py-12">
          <FiMapPin size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Tidak ada destinasi yang cocok dengan pencarian Anda' : 'Belum ada destinasi tersedia'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinasi.map((item) => (
            <Link
              key={item.id}
              to={`/destinasi/${item.id}`}
              className="group card hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={`http://localhost:7777/uploads/destinasi/${item.gambar}`}
                  alt={item.nama_destinasi}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                  {item.nama_destinasi}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.deskripsi}</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <FiMapPin size={18} />
                  <span>{item.lokasi}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinasi;
