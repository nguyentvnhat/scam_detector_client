import { AnalysisResult } from '../utils/api';
import { motion } from 'framer-motion';

interface ResultCardProps {
  result: AnalysisResult;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-gray-200 p-6 space-y-6"
    >
      {/* Transcript Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Transcript</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
          {result.transcript}
        </p>
      </div>

      {/* Risk Score Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Score</h3>
        <div
          className={`inline-flex items-center px-4 py-2 rounded-lg border ${getRiskColor(
            result.riskScore
          )}`}
        >
          <span className="text-2xl font-bold">{result.riskScore}%</span>
        </div>
      </div>

      {/* Warnings Section */}
      {result.flagged.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Warnings</h3>
          <ul className="space-y-3">
            {result.flagged.map((flag, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <svg
                  className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-semibold text-red-700">"{flag.text}"</span> → {flag.reason}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

