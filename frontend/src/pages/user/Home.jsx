import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import { destinasiService } from '../../services/api';

const Home = () => {
  const [destinasi, setDestinasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinasi();
  }, []);

  const fetchDestinasi = async () => {
    try {
      const response = await destinasiService.getAll();
      setDestinasi(response.data.slice(0, 6)); // Show only 6 items
    } catch (error) {
      console.error('Error fetching destinasi:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-secondary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Jelajahi Wisata Edukasi di Indonesia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Temukan destinasi menarik, pelajari sejarah dan budaya, serta bagikan pengalaman Anda
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/destinasi"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                Mulai Jelajah
              </Link>
              <Link
                to="/materi"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition"
              >
                Lihat Materi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Destinasi Populer</h2>
          <p className="text-gray-600 text-lg">
            Kunjungi tempat-tempat menarik dengan nilai edukasi tinggi
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-xl mb-4"></div>
                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinasi.map((item) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                    {item.nama_destinasi}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.deskripsi}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-500">
                      <FiMapPin />
                      {item.lokasi}
                    </span>
                    <span className="text-primary font-semibold flex items-center gap-1">
                      Lihat Detail
                      <FiArrowRight className="group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/destinasi"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Lihat Semua Destinasi
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Petualangan?</h2>
          <p className="text-xl mb-8 text-white/90">
            Daftar sekarang dan nikmati pengalaman wisata edukasi yang tak terlupakan
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Daftar Gratis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
