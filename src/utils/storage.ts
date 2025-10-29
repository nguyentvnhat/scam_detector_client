import { AnalysisResult } from './api';

export interface SavedFile {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  result: AnalysisResult;
}

const STORAGE_KEY = 'nghelabiet_user_files';
const PROFILE_KEY = 'nghelabiet_user_profile';

export interface UserProfile {
  fullName: string;
  email: string;
}

// File Management
export const saveFile = (file: File, result: AnalysisResult): SavedFile => {
  const savedFile: SavedFile = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    fileName: file.name,
    fileSize: file.size,
    uploadedAt: new Date().toISOString(),
    result,
  };

  const files = getSavedFiles();
  files.unshift(savedFile); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  return savedFile;
};

export const getSavedFiles = (): SavedFile[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteFile = (id: string): void => {
  const files = getSavedFiles();
  const filtered = files.filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getFileById = (id: string): SavedFile | null => {
  const files = getSavedFiles();
  return files.find((f) => f.id === id) || null;
};

// Profile Management
export const getProfile = (): UserProfile | null => {
  const stored = localStorage.getItem(PROFILE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const updateProfile = (updates: Partial<UserProfile>): void => {
  const current = getProfile();
  if (current) {
    saveProfile({ ...current, ...updates });
  } else {
    saveProfile(updates as UserProfile);
  }
};

