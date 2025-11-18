import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FiPlus, FiEdit, FiTrash2, FiBook } from 'react-icons/fi';
import { materiService } from '../../services/api';
import { TableSkeleton } from '../../components/Skeleton';

const MateriList = () => {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMateri();
  }, []);

  const fetchMateri = async () => {
    try {
      const response = await materiService.getAll();
      setMateri(response.data);
    } catch (error) {
      toast.error('Gagal memuat data materi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, judul) => {
    const result = await Swal.fire({
      title: 'Hapus Materi?',
      text: `Apakah Anda yakin ingin menghapus "${judul}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await materiService.delete(id);
        toast.success('Materi berhasil dihapus');
        fetchMateri();
      } catch (error) {
        toast.error('Gagal menghapus materi');
      }
    }
  };

  if (loading) return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Materi</h1>
      <TableSkeleton />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Materi</h1>
        <Link to="/admin/materi/add" className="btn-primary flex items-center gap-2">
          <FiPlus />
          Tambah Materi
        </Link>
      </div>

      {materi.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <FiBook size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Belum ada materi. Tambahkan yang pertama!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materi.map((item) => (
            <div key={item.id} className="card hover:shadow-xl transition">
              <img
                src={`http://localhost:7777/uploads/materi/${item.media}`}
                alt={item.judul}
                className="w-full h-48 object-cover rounded-t-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <div className="p-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                  {item.nama_destinasi || 'Destinasi'}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.judul}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.isi}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/materi/edit/${item.id}`}
                    className="flex-1 btn-secondary text-center"
                  >
                    <FiEdit className="inline mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.judul)}
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

export default MateriList;
