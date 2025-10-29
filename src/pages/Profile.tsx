import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { SEO } from '../components/SEO';
import { getUserEmail, isAuthenticated } from '../utils/auth';
import { getProfile, saveProfile, UserProfile } from '../utils/storage';

export const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Load profile or use defaults
    const profile = getProfile();
    const userEmail = getUserEmail();
    
    if (profile) {
      setFullName(profile.fullName || '');
      setEmail(profile.email || userEmail || '');
    } else if (userEmail) {
      setEmail(userEmail);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');

    // Validate
    if (!fullName.trim() || fullName.trim().length < 2) {
      alert(t('profile.fullNameError'));
      setIsSaving(false);
      return;
    }

    if (!email || !email.includes('@')) {
      alert(t('profile.emailError'));
      setIsSaving(false);
      return;
    }

    // Save profile
    const profile: UserProfile = {
      fullName: fullName.trim(),
      email: email.trim(),
    };
    saveProfile(profile);

    setIsSaving(false);
    setSuccessMessage(t('profile.saveSuccess'));

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO title={`${t('profile.title')} - ${t('common.appName')}`} />
      <Navbar showAuth={true} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              {t('profile.title')}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {t('profile.description')}
            </p>
          </div>

          {/* Profile Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('profile.fullName')}
                </label>
                <motion.input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all hover:border-gray-400"
                  placeholder={t('profile.fullNamePlaceholder')}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('profile.email')}
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all hover:border-gray-400"
                  placeholder={t('profile.emailPlaceholder')}
                  required
                />
              </div>

              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600 bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {successMessage}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={{ scale: isSaving ? 1 : 1.02 }}
                whileTap={{ scale: isSaving ? 1 : 0.98 }}
                className="relative w-full px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.svg
                      className="w-5 h-5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </motion.svg>
                    {t('profile.saving')}
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t('profile.save')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </form>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

