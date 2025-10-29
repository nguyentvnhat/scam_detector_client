import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { FileUploader } from '../components/FileUploader';
import { ResultCard } from '../components/ResultCard';
import { analyzeAudio, AnalysisResult } from '../utils/api';

export const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Vui lòng chọn file audio hoặc video');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeAudio(selectedFile);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Có lỗi xảy ra khi phân tích file');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar showAuth={true} />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Tải lên file audio hoặc video để phân tích và phát hiện lừa đảo
            </p>
          </div>

          {/* File Upload Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Tải lên file
            </h2>
            <FileUploader
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
            />
          </section>

          {/* Analyze Button Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Phân tích
            </h2>
            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  </svg>
                  <span>Đang phân tích...</span>
                </>
              ) : (
                <span>Phân tích</span>
              )}
            </button>
          </section>

          {/* Results Section */}
          {analysisResult && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Kết quả phân tích
              </h2>
              <ResultCard result={analysisResult} />
            </section>
          )}
        </motion.div>
      </main>
    </div>
  );
};

