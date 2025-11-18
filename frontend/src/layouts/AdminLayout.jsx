import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiMap, FiBook, FiStar, FiUsers, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Dashboard from '../pages/admin/Dashboard';
import DestinasiList from '../pages/admin/DestinasiList';
import DestinasiAdd from '../pages/admin/DestinasiAdd';
import DestinasiEdit from '../pages/admin/DestinasiEdit';
import MateriList from '../pages/admin/MateriList';
import MateriAdd from '../pages/admin/MateriAdd';
import MateriEdit from '../pages/admin/MateriEdit';
import ReviewList from '../pages/admin/ReviewList';
import UserList from '../pages/admin/UserList';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/destinasi', icon: FiMap, label: 'Destinasi' },
    { path: '/admin/materi', icon: FiBook, label: 'Materi' },
    { path: '/admin/review', icon: FiStar, label: 'Review' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-primary to-secondary text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {sidebarOpen && <h1 className="text-2xl font-bold">EduTour</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-white text-primary font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/20">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-sm opacity-75">Logged in as</p>
              <p className="font-semibold">{user.nama || 'Admin'}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-white/10 transition"
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="destinasi" element={<DestinasiList />} />
            <Route path="destinasi/add" element={<DestinasiAdd />} />
            <Route path="destinasi/edit/:id" element={<DestinasiEdit />} />
            <Route path="materi" element={<MateriList />} />
            <Route path="materi/add" element={<MateriAdd />} />
            <Route path="materi/edit/:id" element={<MateriEdit />} />
            <Route path="review" element={<ReviewList />} />
            <Route path="users" element={<UserList />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
