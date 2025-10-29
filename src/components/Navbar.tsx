import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserEmail, removeUserEmail } from '../utils/auth';

interface NavbarProps {
  showAuth?: boolean;
}

export const Navbar = ({ showAuth = false }: NavbarProps) => {
  const userEmail = getUserEmail();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLandingPage = location.pathname === '/';

  const handleLogout = () => {
    removeUserEmail();
    window.location.href = '/login';
  };

  const handleScrollTo = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
              ChongLuaDao.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isLandingPage && !showAuth && (
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => handleScrollTo('features')}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Tính năng
              </button>
              <button
                onClick={() => handleScrollTo('how-it-works')}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cách hoạt động
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Về chúng tôi
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
              >
                Đăng nhập
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isLandingPage && !showAuth && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}

          {/* Auth Buttons */}
          {showAuth && userEmail ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
              >
                Đăng xuất
              </button>
            </div>
          ) : !showAuth && !isLandingPage && (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Đăng nhập
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isLandingPage && !showAuth && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleScrollTo('features')}
                className="text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Tính năng
              </button>
              <button
                onClick={() => handleScrollTo('how-it-works')}
                className="text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cách hoạt động
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Về chúng tôi
              </button>
              <Link
                to="/login"
                className="text-left px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

