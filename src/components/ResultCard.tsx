import { AnalysisResult } from '../utils/api';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ResultCardProps {
  result: AnalysisResult;
}

// Helper function to translate reasoning labels
const translateLabel = (label: string, t: (key: string) => string): string => {
  // Remove colon if present for lookup
  const key = label.replace(':', '').trim();
  
  // Try exact match first
  let translationKey = `results.reasoningLabels.${key}`;
  let translated = t(translationKey);
  
  // If translation exists (not the same as key), use it
  if (translated && translated !== translationKey) {
    return translated + (label.endsWith(':') ? ':' : '');
  }
  
  // Try case-insensitive match
  const lowerKey = key.toLowerCase();
  const labelKeys = [
    'Context', 'Behavioral indicators', 'Linguistic signals',
    'Emotional tone', 'Social engineering techniques', 'Information sensitivity',
    'Verification cues', 'Consistency check', 'Previous pattern match',
    'Risk assessment', 'Summary'
  ];
  
  const matchedKey = labelKeys.find(lk => lk.toLowerCase() === lowerKey);
  if (matchedKey) {
    translationKey = `results.reasoningLabels.${matchedKey}`;
    translated = t(translationKey);
    if (translated && translated !== translationKey) {
      return translated + (label.endsWith(':') ? ':' : '');
    }
  }
  
  // Fallback to original
  return label;
};

// Helper function to format reasoning text with bullets and line breaks
const formatReasoning = (text: string, t: (key: string) => string): string => {
  if (!text) return '';
  
  // Replace \n with actual newlines
  let processed = text.replace(/\\n/g, '\n');
  
  // Split by newlines to process each line
  const lines = processed.split('\n').map(line => line.trim()).filter(line => line);
  
  const formattedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if it's a bullet point starting with *
    if (line.startsWith('* ')) {
      const content = line.substring(2).trim();
      
      // Special handling for Summary section
      if (content.toLowerCase().startsWith('summary:')) {
        const summaryContent = content.substring(8).trim();
        const summaryLabel = translateLabel('Summary:', t);
        formattedLines.push(
          `<div class="mt-5 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
            <div class="font-bold text-blue-900 text-base mb-2 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              ${summaryLabel.replace(':', '')}
            </div>
            <p class="text-blue-800 leading-relaxed">${summaryContent}</p>
          </div>`
        );
        continue;
      }
      
      // Check if it's a heading with content (contains colon)
      if (content.includes(':')) {
        const colonIndex = content.indexOf(':');
        const originalLabel = content.substring(0, colonIndex + 1).trim();
        const description = content.substring(colonIndex + 1).trim();
        // Translate the label
        const translatedLabel = translateLabel(originalLabel, t);
        
        formattedLines.push(
          `<div class="mt-3 mb-2.5">
            <div class="flex items-start gap-2">
              <span class="text-blue-600 font-semibold mt-1">•</span>
              <div class="flex-1">
                <span class="font-semibold text-gray-900">${translatedLabel}</span>
                ${description ? `<span class="text-gray-700 ml-2">${description}</span>` : ''}
              </div>
            </div>
          </div>`
        );
      } else {
        // Regular bullet point without colon
        formattedLines.push(
          `<div class="ml-2 mb-2 text-gray-700 leading-relaxed">
            <span class="text-gray-400">•</span> ${content}
          </div>`
        );
      }
    } else if (line.trim()) {
      // Non-bullet line (shouldn't happen much, but handle it)
      formattedLines.push(`<p class="mb-2 text-gray-600">${line}</p>`);
    }
  }
  
  return formattedLines.join('');
};

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm md:text-base text-gray-700 leading-relaxed bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: formatReasoning(result.transcript, t) }}
        />
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

