import { Link } from 'react-router-dom';
import { getUserEmail, removeUserEmail } from '../utils/auth';
import { motion } from 'framer-motion';

interface NavbarProps {
  showAuth?: boolean;
}

export const Navbar = ({ showAuth = false }: NavbarProps) => {
  const userEmail = getUserEmail();

  const handleLogout = () => {
    removeUserEmail();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">ChongLuaDao.AI</span>
          </Link>

          {showAuth && userEmail && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

