import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'header' | 'footer';
  showText?: boolean;
  className?: string;
}

export const Logo = ({ variant = 'header', showText = true, className = '' }: LogoProps) => {
  const isFooter = variant === 'footer';
  const textColor = isFooter ? 'text-white' : 'text-gray-900';
  const iconBg = isFooter ? 'bg-white' : 'bg-gray-900';
  const iconFill = isFooter ? '#000000' : '#FFFFFF';

  const logoIcon = (
    <div className={`${iconBg} rounded-lg sm:rounded-xl w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0 shadow-sm`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
      >
        <path 
          d="M50 15 L25 25 L25 45 Q25 65 50 80 Q75 65 75 45 L75 25 Z" 
          fill={iconFill} 
          stroke={iconFill} 
          strokeWidth="2"
        />
        <path 
          d="M50 20 L30 28 L30 45 Q30 62 50 75 Q70 62 70 45 L70 28 Z" 
          fill={isFooter ? '#FFFFFF' : '#000000'}
        />
        <path 
          d="M40 45 L50 55 L60 45" 
          stroke={iconFill} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
      </svg>
    </div>
  );

  const logoContent = (
    <div className={`flex items-center space-x-1 sm:space-x-1.5 ${className}`}>
      {logoIcon}
      {showText && (
        <span className={`text-base sm:text-lg md:text-xl font-bold ${textColor} transition-colors`}>
          {isFooter ? 'Blacklist' : 'Blacklist'}
        </span>
      )}
    </div>
  );

  if (variant === 'header') {
    return (
      <Link to="/" className="group">
        <motion.div
          className="flex items-center space-x-1 sm:space-x-1.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {logoIcon}
          {showText && (
            <motion.span
              className={`text-base sm:text-lg md:text-xl font-bold ${textColor} group-hover:opacity-80 transition-opacity`}
            >
              Blacklist
            </motion.span>
          )}
        </motion.div>
      </Link>
    );
  }

  return logoContent;
};

