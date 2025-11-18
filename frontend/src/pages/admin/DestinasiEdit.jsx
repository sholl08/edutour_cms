import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { destinasiService } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const DestinasiEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama_destinasi: '',
    deskripsi: '',
    lokasi: '',
    latitude: '',
    longitude: '',
    gambar: null,
  });
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDestinasi();
  }, [id]);

  const fetchDestinasi = async () => {
    try {
      const response = await destinasiService.getById(id);
      const data = response.data;
      setFormData({
        nama_destinasi: data.nama_destinasi,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi,
        latitude: data.latitude,
        longitude: data.longitude,
        gambar: null,
      });
      setExistingImage(data.gambar);
    } catch (error) {
      toast.error('Gagal memuat data destinasi');
      navigate('/admin/destinasi');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, gambar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('nama_destinasi', formData.nama_destinasi);
    data.append('deskripsi', formData.deskripsi);
    data.append('lokasi', formData.lokasi);
    data.append('latitude', formData.latitude);
    data.append('longitude', formData.longitude);
    if (formData.gambar) {
      data.append('gambar', formData.gambar);
    }

    try {
      await destinasiService.update(id, data);
      toast.success('Destinasi berhasil diperbarui');
      navigate('/admin/destinasi');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui destinasi');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/destinasi')}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Destinasi</h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        {/* Nama Destinasi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Destinasi *
          </label>
          <input
            type="text"
            name="nama_destinasi"
            value={formData.nama_destinasi}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi *
          </label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            rows="4"
            className="input-field"
            required
          />
        </div>

        {/* Lokasi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lokasi *
          </label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Koordinat */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude *
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude *
            </label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Gambar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Destinasi
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input-field"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-cover rounded-lg"
            />
          ) : existingImage ? (
            <img
              src={`http://localhost:7777/uploads/destinasi/${existingImage}`}
              alt="Current"
              className="mt-4 w-full max-h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          ) : null}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <FiSave />
            {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/destinasi')}
            className="btn-secondary"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinasiEdit;
