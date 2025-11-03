import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export const Logo = ({ variant = 'header', className = '' }: LogoProps) => {
  // Header: Text logo "BLACKLIST.VN" với stylized B
  if (variant === 'header') {
    return (
      <Link to="/" className="group">
        <motion.div 
          className={`flex items-center gap-0 ${className}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Stylized B with peel effect */}
          <div className="relative">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-none">B</span>
            {/* Peel effect overlay */}
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-gray-200 via-gray-100 to-white rounded-sm opacity-80"></div>
          </div>
          {/* LACKLIST text */}
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-none tracking-tight">LACKLIST</span>
          {/* .VN text (smaller) */}
          <span className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 leading-none self-end pb-0.5 sm:pb-1">.VN</span>
        </motion.div>
      </Link>
    );
  }

  // Footer: No logo (removed as requested)
  return null;
};

