import { AnalysisResult } from '../utils/api';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ResultCardProps {
  result: AnalysisResult;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const { t } = useTranslation();

  
  // confidence là số từ 0-1, thể hiện mức độ tin tưởng của hệ thống về kết luận
  // Khi is_scam = true: confidence = 0.95 nghĩa là hệ thống tin 95% rằng đây LÀ lừa đảo
  // Khi is_scam = false: confidence = 0.30 nghĩa là hệ thống chỉ tin 30% rằng đây là bình thường (không chắc chắn)
  const getConfidenceColor = (confidence: number, isScam: boolean) => {
    if (isScam) {
      // Trường hợp là lừa đảo
      if (confidence >= 0.9) {
        // Confidence cao (≥0.9) = hệ thống rất chắc chắn đây là lừa đảo → màu đỏ (nguy hiểm)
        return 'text-red-600 bg-red-50 border-red-200';
      }
      if (confidence >= 0.6) {
        // Confidence trung bình = tương đối chắc chắn là lừa đảo → màu cam
        return 'text-orange-600 bg-orange-50 border-orange-200';
      }
      // Confidence thấp = không chắc chắn lắm nhưng vẫn phát hiện là lừa đảo → màu vàng
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    } else {
      // Trường hợp không phải lừa đảo
      if (confidence >= 0.9) {
        // Confidence cao = hệ thống rất chắc chắn đây là bình thường → màu xanh (an toàn)
        return 'text-green-600 bg-green-50 border-green-200';
      }
      if (confidence >= 0.6) {
        // Confidence trung bình = tương đối chắc chắn là bình thường → màu vàng xanh
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      }
      // Confidence thấp = không chắc chắn lắm → màu xám (cần kiểm tra thêm)
      return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  // Convert confidence (0-1) to percentage (0-100)
  const confidencePercent = Math.round(result.riskScore * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className="bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 p-6 md:p-8 space-y-6 md:space-y-8 hover:shadow-xl transition-all duration-300"
    >
      {/* Transcript Section */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t('results.transcript')}
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm md:text-base text-gray-700 leading-relaxed bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm"
        >
          {result.transcript}
        </motion.p>
      </motion.div>

      {/* Confidence Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {t('results.riskScore')}
        </h3> */}
        <div className="space-y-3">
          <motion.div
            className={`inline-flex items-center px-5 py-3 md:px-6 md:py-4 rounded-xl border-2 shadow-md ${getConfidenceColor(
              result.riskScore,
              result.flagged
            )}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-2xl md:text-3xl font-bold">{confidencePercent}%</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm md:text-base text-gray-600 leading-relaxed"
          >
            {result.riskScore < 0.5 
              ? t('results.confidenceDescriptionLow', { percent: confidencePercent })
              : result.flagged
                ? t('results.confidenceDescriptionScam', { percent: confidencePercent })
                : t('results.confidenceDescriptionNotScam', { percent: confidencePercent })
            }
          </motion.p>
        </div>
      </motion.div>

      {/* Scam Warning Section */}
      {result.flagged && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ x: 5, scale: 1.02 }}
            transition={{ 
              type: "spring",
              stiffness: 200
            }}
            className="flex items-center space-x-3 p-4 md:p-5 bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-red-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <div className="flex-1">
              <p className="text-base md:text-lg font-bold text-red-700">
                {t('results.isScam')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

