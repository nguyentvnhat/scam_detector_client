import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

// Lazy load HeroIllustration for better performance
const HeroIllustration = lazy(() => import('../components/HeroIllustration').then(module => ({ default: module.HeroIllustration })));

export const Landing = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '98%', label: t('stats.accuracy') },
    { value: '<2s', label: t('stats.speed') },
    { value: '10K+', label: t('stats.samples') },
    { value: '24/7', label: t('stats.uptime') },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: t('features.feature1Title'),
      description: t('features.feature1Desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('features.feature2Title'),
      description: t('features.feature2Desc'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('features.feature3Title'),
      description: t('features.feature3Desc'),
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
    },
    {
      step: '02',
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
    },
    {
      step: '03',
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
    },
  ];

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* Animated background gradients */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    {t('hero.badge')}
                  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                >
                  {t('hero.title')}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-2 md:mb-4 font-light"
                >
                  {t('hero.subtitle')}
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-8 md:mb-12 font-semibold"
                >
                  {t('hero.highlight')}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/dashboard"
                      className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-xl overflow-hidden shadow-xl text-base sm:text-lg text-center inline-block group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t('hero.ctaPrimary')}
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={() => handleScrollTo('about')}
                      className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/80 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-all text-base sm:text-lg overflow-hidden group"
                    >
                      <span className="relative z-10">{t('hero.ctaSecondary')}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column - Hero Illustration */}
              <div className="hidden lg:block">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                }>
                  <HeroIllustration />
                </Suspense>
              </div>
            </div>

            {/* Mobile Hero Illustration - Below text on mobile */}
            <div className="lg:hidden mt-8">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              }>
                <HeroIllustration />
              </Suspense>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full filter blur-3xl opacity-50"></div>
          
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-center"
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 md:mb-8"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                {t('about.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8 px-2"
              >
                {t('about.paragraph1')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2"
              >
                {t('about.paragraph2')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white border-b border-gray-100 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-default"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 shadow-sm group-hover:shadow-xl group-hover:border-gray-300 transition-all duration-300">
                    <motion.div
                      className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 md:mb-3"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="risks" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                {t('risks.title')}
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                {t('risks.description')}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {[
                t('risks.risk1'),
                t('risks.risk2'),
                t('risks.risk3')
              ].map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="flex items-start space-x-3 p-4 md:p-5 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200/50 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-400/0 group-hover:from-red-400/5 group-hover:to-red-500/5 transition-all duration-300"></div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-red-600 flex-shrink-0 mt-0.5 group-hover:text-red-700 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium relative z-10 leading-relaxed">{risk}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                {t('features.title')}
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                {t('features.description')}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 hover:border-gray-900/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 via-gray-900/0 to-gray-900/0 group-hover:from-gray-900/5 group-hover:via-gray-900/3 group-hover:to-gray-900/0 transition-all duration-300"></div>
                  
                  {/* Animated icon container */}
                  <motion.div
                    className="relative w-14 h-14 md:w-18 md:h-18 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center text-white mb-4 md:mb-6 group-hover:from-gray-800 group-hover:to-gray-900 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110"
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-7 h-7 md:w-9 md:h-9">
                      {feature.icon}
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 relative z-10 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed relative z-10">
                    {feature.description}
                  </p>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-900/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                {t('howItWorks.title')}
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                {t('howItWorks.description')}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative group"
                >
                  <div className="relative bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 hover:border-gray-900/30 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Animated step number */}
                    <motion.div
                      className="relative text-5xl md:text-6xl font-black bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 bg-clip-text text-transparent mb-4 md:mb-5"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.2,
                      }}
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.step}
                    </motion.div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 relative z-10 group-hover:text-gray-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed relative z-10">
                      {step.description}
                    </p>
                    
                    {/* Decorative element */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </div>
                  
                  {/* Animated connector arrow */}
                  {index < howItWorks.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-10"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    >
                      <motion.div
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 px-4">
                {t('cta.description')}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard"
                  className="relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-xl overflow-hidden shadow-2xl text-base sm:text-lg group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t('cta.button')}
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </motion.svg>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

