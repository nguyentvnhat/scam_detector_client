import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export const Logo = ({ variant = 'header', className = '' }: LogoProps) => {
  // Header: to lên 50% (w-6→w-9, w-7→w-[2.625rem], w-8→w-12)
  // Footer: to lên 50% và align với text
  const sizeClasses = variant === 'header' 
    ? 'w-9 h-9 sm:w-[2.625rem] sm:h-[2.625rem] md:w-12 md:h-12'
    : 'w-9 h-9 sm:w-[2.625rem] sm:h-[2.625rem] md:w-12 md:h-12';
  
  const logoImage = (
    <motion.img
      src="/logo.png"
      alt="Blacklist Logo"
      className={`${sizeClasses} flex-shrink-0 object-contain`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    />
  );

  if (variant === 'header') {
    return (
      <Link to="/" className="group">
        <div className={`flex items-center ${className}`}>
          {logoImage}
        </div>
      </Link>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {logoImage}
    </div>
  );
};

