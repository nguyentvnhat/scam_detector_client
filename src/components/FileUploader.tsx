import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const FileUploader = ({ onFileSelect, selectedFile }: FileUploaderProps) => {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);

  const MAX_FILE_SIZE = 3.5 * 1024 * 1024; // 3.5MB in bytes

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      alert(t('pageDashboard.fileTooLarge', { maxSize: '3.5MB' }));
      return false;
    }
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  return (
    <motion.div
      className={`border-2 border-dashed rounded-xl p-6 md:p-8 transition-all duration-300 ${
        dragActive
          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
          : selectedFile
          ? 'border-green-500 bg-green-50 shadow-md'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:shadow-md'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      whileHover={{ scale: selectedFile ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <input
        type="file"
        accept="audio/*,video/*"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer block text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {selectedFile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm sm:text-base font-semibold text-green-700">
                  {t('pageDashboard.fileSelected')}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-green-600 font-medium mb-1 break-all px-2">
                {selectedFile.name}
              </p>
              <p className="text-xs text-green-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">
                {t('pageDashboard.uploadHint')}{' '}
                <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">{t('pageDashboard.uploadHint2')}</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {t('pageDashboard.uploadSupport')}
              </p>
            </div>
          )}
        </div>
      </label>
    </motion.div>
  );
};

