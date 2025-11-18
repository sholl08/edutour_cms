import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiMap, FiBook, FiStar, FiUser, FiLogOut } from 'react-icons/fi';
import Home from '../pages/user/Home';
import Destinasi from '../pages/user/Destinasi';
import DestinasiDetail from '../pages/user/DestinasiDetail';
import Materi from '../pages/user/Materi';
import Review from '../pages/user/Review';

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  let user = {};
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/home', icon: FiHome, label: 'Home' },
    { path: '/destinasi', icon: FiMap, label: 'Destinasi' },
    { path: '/materi', icon: FiBook, label: 'Materi' },
    { path: '/review', icon: FiStar, label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduTour
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {token ? (
                <>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <FiUser size={18} />
                    <span className="text-sm font-medium">{user.nama}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FiLogOut size={18} />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-around py-2 border-t">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${
                    isActive ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/destinasi" element={<Destinasi />} />
          <Route path="/destinasi/:id" element={<DestinasiDetail />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/review" element={<Review />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">EduTour</h3>
              <p className="text-gray-400 text-sm">
                Platform wisata edukasi untuk menjelajahi destinasi menarik di Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/destinasi" className="text-gray-400 hover:text-white">Destinasi</Link></li>
                <li><Link to="/materi" className="text-gray-400 hover:text-white">Materi</Link></li>
                <li><Link to="/review" className="text-gray-400 hover:text-white">Review</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-400 text-sm">Email: info@edutour.com</p>
              <p className="text-gray-400 text-sm">Phone: +62 123 4567 890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            © 2024 EduTour CMS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
