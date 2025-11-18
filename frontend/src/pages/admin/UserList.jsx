import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FiUsers, FiTrash2, FiMail } from 'react-icons/fi';
import { userService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      // Backend mengirim { message, data }, ambil data-nya
      const userData = response.data?.data || response.data || [];
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Gagal memuat data user');
      setUsers([]); // Set empty array jika error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nama) => {
    const result = await Swal.fire({
      title: 'Hapus User?',
      text: `Apakah Anda yakin ingin menghapus user "${nama}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await userService.delete(id);
        toast.success('User berhasil dihapus');
        fetchUsers();
      } catch (error) {
        toast.error('Gagal menghapus user');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kelola Users</h1>

      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <FiUsers size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Belum ada user terdaftar.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">No</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal Daftar</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{user.nama}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMail size={16} />
                      {user.email}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(user.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(user.id, user.nama)}
                      className="btn-danger inline-flex items-center gap-2"
                    >
                      <FiTrash2 />
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
