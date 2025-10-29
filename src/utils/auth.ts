const AUTH_KEY = 'chongluadao_user_email';

export const setUserEmail = (email: string): void => {
  localStorage.setItem(AUTH_KEY, email);
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem(AUTH_KEY);
};

export const removeUserEmail = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getUserEmail();
};

