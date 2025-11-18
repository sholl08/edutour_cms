import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { materiService, destinasiService } from '../../services/api';

const MateriAdd = () => {
  const navigate = useNavigate();
  const [destinasiList, setDestinasiList] = useState([]);
  const [formData, setFormData] = useState({
    destinasi_id: '',
    judul: '',
    isi: '',
    media: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDestinasi();
  }, []);

  const fetchDestinasi = async () => {
    try {
      const response = await destinasiService.getAll();
      setDestinasiList(response.data);
    } catch (error) {
      toast.error('Gagal memuat data destinasi');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, media: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('destinasi_id', formData.destinasi_id);
    data.append('judul', formData.judul);
    data.append('isi', formData.isi);
    if (formData.media) {
      data.append('file', formData.media);
    }

    try {
      await materiService.create(data);
      toast.success('Materi berhasil ditambahkan');
      navigate('/admin/materi');
    } catch (error) {
      console.error('Error adding materi:', error);
      toast.error(error.response?.data?.message || 'Gagal menambahkan materi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/materi')}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Tambah Materi</h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {/* Destinasi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destinasi *
          </label>
          <select
            name="destinasi_id"
            value={formData.destinasi_id}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Pilih Destinasi</option>
            {destinasiList.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.nama_destinasi}
              </option>
            ))}
          </select>
        </div>

        {/* Judul */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Materi *
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Contoh: Sejarah Candi Borobudur"
            className="input-field"
            required
          />
        </div>

        {/* Konten */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konten Materi *
          </label>
          <textarea
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            placeholder="Tulis konten materi edukasi..."
            rows="8"
            className="input-field"
            required
          />
        </div>

        {/* Gambar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Materi
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input-field"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <FiSave />
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/materi')}
            className="btn-secondary"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default MateriAdd;
