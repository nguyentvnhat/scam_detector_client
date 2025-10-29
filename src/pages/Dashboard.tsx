import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { FileUploader } from '../components/FileUploader';
import { ResultCard } from '../components/ResultCard';
import { Captcha } from '../components/Captcha';
import { SEO } from '../components/SEO';
import { analyzeAudio, AnalysisResult } from '../utils/api';
import { isAuthenticated } from '../utils/auth';
import { saveFile } from '../utils/storage';

export const Dashboard = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const isLoggedIn = isAuthenticated();

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert(t('dashboard.selectFile'));
      return;
    }

    // Check if user needs to verify CAPTCHA
    if (!isLoggedIn && !captchaVerified) {
      setShowCaptcha(true);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeAudio(selectedFile);
      setAnalysisResult(result);
      
      // Save to history if logged in
      if (isLoggedIn) {
        saveFile(selectedFile, result);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert(t('dashboard.analyzeError'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCaptchaVerify = (isValid: boolean) => {
    setCaptchaVerified(isValid);
    if (isValid) {
      setShowCaptcha(false);
      // Auto-analyze after CAPTCHA verification
      setTimeout(() => {
        handleAnalyze();
      }, 500);
    }
  };

  const handleCaptchaReset = () => {
    setCaptchaVerified(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO title={`${t('dashboard.title')} - ${t('common.appName')}`} />
      <Navbar showAuth={isLoggedIn} />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 md:mb-3">{t('dashboard.title')}</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-3">
              {t('dashboard.description')}
            </p>
            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('dashboard.notLoggedIn')}</span>
                <Link to="/login" className="ml-auto text-blue-600 hover:text-blue-700 font-medium underline">
                  {t('dashboard.loginToSave')}
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* File Upload Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 p-5 sm:p-6 md:p-8"
          >
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
              <motion.span
                className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                1
              </motion.span>
              {t('dashboard.uploadTitle')}
            </h2>
            <FileUploader
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
            />
          </motion.section>

          {/* Analyze Button Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 p-5 sm:p-6 md:p-8"
          >
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
              <motion.span
                className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                2
              </motion.span>
              {t('dashboard.analyzeTitle')}
            </h2>
            <motion.button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing || (!isLoggedIn && !captchaVerified)}
              whileHover={{ scale: selectedFile && !isAnalyzing && (isLoggedIn || captchaVerified) ? 1.02 : 1 }}
              whileTap={{ scale: selectedFile && !isAnalyzing && (isLoggedIn || captchaVerified) ? 0.98 : 1 }}
              className="relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl overflow-hidden group"
            >
              {isAnalyzing ? (
                <>
                  <motion.svg
                    className="h-5 w-5 md:h-6 md:w-6 text-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </motion.svg>
                  <span className="text-sm sm:text-base">{t('dashboard.analyzing')}</span>
                </>
              ) : !isLoggedIn && !captchaVerified ? (
                <>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm sm:text-base">{t('dashboard.verifyCaptcha')}</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base">{t('dashboard.analyze')}</span>
                  <motion.svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </>
              )}
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={!isAnalyzing && selectedFile && (isLoggedIn || captchaVerified) ? { x: '100%' } : {}}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>
          </motion.section>

          {/* CAPTCHA Section - Only show for non-logged in users */}
          {showCaptcha && !isLoggedIn && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 p-5 sm:p-6 md:p-8"
            >
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                <motion.span
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  🔒
                </motion.span>
                {t('dashboard.captchaTitle')}
              </h2>
              <Captcha onVerify={handleCaptchaVerify} onReset={handleCaptchaReset} />
            </motion.section>
          )}

          {/* Results Section */}
          {analysisResult && (
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 p-5 sm:p-6 md:p-8"
            >
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                <motion.span
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-md"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  3
                </motion.span>
                {t('dashboard.resultsTitle')}
              </h2>
              <ResultCard result={analysisResult} />
              
              {/* Save History Section - Only show if not logged in */}
              {!isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{t('dashboard.saveHistory')}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">{t('dashboard.saveHistoryDesc')}</p>
                        <Link
                          to="/login"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {t('dashboard.loginToSave')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Success Message - Show if logged in and file saved */}
              {isLoggedIn && analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{t('dashboard.fileSaved')}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3">{t('dashboard.fileSavedDesc')}</p>
                        <Link
                          to="/files"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {t('dashboard.viewFiles')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </motion.div>
      </main>
    </div>
  );
};

