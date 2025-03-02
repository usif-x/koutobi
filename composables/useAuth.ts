export const useAuth = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigateTo('/login');
  };

  return {
    isAuthenticated,
    getToken,
    getRefreshToken,
    logout
  };
};