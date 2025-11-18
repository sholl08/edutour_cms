import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FiPlus, FiEdit, FiTrash2, FiMapPin } from 'react-icons/fi';
import { destinasiService } from '../../services/api';
import { TableSkeleton } from '../../components/Skeleton';

const DestinasiList = () => {
  const [destinasi, setDestinasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinasi();
  }, []);

  const fetchDestinasi = async () => {
    try {
      const response = await destinasiService.getAll();
      setDestinasi(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetch destinasi:', error);
      toast.error('Gagal memuat data destinasi');
      setDestinasi([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const result = await Swal.fire({
      title: 'Hapus Destinasi?',
      text: `Apakah Anda yakin ingin menghapus "${nama}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await destinasiService.delete(id);
        toast.success('Destinasi berhasil dihapus');
        fetchDestinasi();
      } catch (error) {
        toast.error('Gagal menghapus destinasi');
      }
    }
  };

  if (loading) return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Destinasi</h1>
      <TableSkeleton />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Destinasi</h1>
        <Link to="/admin/destinasi/add" className="btn-primary flex items-center gap-2">
          <FiPlus />
          Tambah Destinasi
        </Link>
      </div>

      {destinasi.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <FiMapPin size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Belum ada destinasi. Tambahkan yang pertama!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinasi.map((item) => (
            <div key={item.id} className="card hover:shadow-xl transition">
              {item.gambar && (
                <img
                  src={`http://localhost:7777/uploads/destinasi/${item.gambar}`}
                  alt={item.nama_destinasi}
                  className="w-full h-48 object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              )}
              {!item.gambar && (
                <div className="w-full h-48 bg-gray-200 rounded-t-xl flex items-center justify-center">
                  <FiMapPin size={48} className="text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.nama_destinasi}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.deskripsi}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <FiMapPin className="inline mr-1" />
                  {item.lokasi}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/destinasi/edit/${item.id}`}
                    className="flex-1 btn-secondary text-center"
                  >
                    <FiEdit className="inline mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.nama_destinasi)}
                    className="flex-1 btn-danger"
                  >
                    <FiTrash2 className="inline mr-1" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinasiList;
