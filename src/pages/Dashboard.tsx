import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { FileUploader } from '../components/FileUploader';
import { ResultCard } from '../components/ResultCard';
import { SEO } from '../components/SEO';
import { analyzeAudio, AnalysisResult } from '../utils/api';

export const Dashboard = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert(t('dashboard.selectFile'));
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeAudio(selectedFile);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert(t('dashboard.analyzeError'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO title={`${t('dashboard.title')} - ${t('common.appName')}`} />
      <Navbar showAuth={true} />
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
            <p className="text-sm sm:text-base text-gray-600">
              {t('dashboard.description')}
            </p>
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
              disabled={!selectedFile || isAnalyzing}
              whileHover={{ scale: selectedFile && !isAnalyzing ? 1.02 : 1 }}
              whileTap={{ scale: selectedFile && !isAnalyzing ? 0.98 : 1 }}
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
                animate={!isAnalyzing && selectedFile ? { x: '100%' } : {}}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>
          </motion.section>

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
            </motion.section>
          )}
        </motion.div>
      </main>
    </div>
  );
};

