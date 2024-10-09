import { create } from 'zustand';

import { STRAVA_BASE_URL } from '../constants';
import { stravaClient, exchangeCodeForToken, refreshAccessToken } from '../services/api/stravaClient';

const REACT_APP_STRAVA_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;

const useAuthStore = create((set) => {
  const getTokenFromLocalStorage = () => ({
    accessToken: localStorage.getItem('stravaAccessToken') || '',
    refreshToken: localStorage.getItem('stravaRefreshToken') || '',
  });

  const setTokensInLocalStorage = (accessToken, refreshToken) => {
    localStorage.setItem('stravaAccessToken', accessToken);
    localStorage.setItem('stravaRefreshToken', refreshToken);
  };

  const clearTokensFromLocalStorage = () => {
    localStorage.removeItem('stravaAccessToken');
    localStorage.removeItem('stravaRefreshToken');
  };

  const checkAuthStatus = async () => {
    const currentTime = Date.now();
    const storedAccessToken = localStorage.getItem('stravaAccessToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
  
    // If no token or if the token is expired
    if (!storedAccessToken || (tokenExpiry && currentTime > tokenExpiry)) {
      const refreshToken = localStorage.getItem('stravaRefreshToken');
      
      // If there's a refresh token, try to refresh the access token
      if (refreshToken) {
        try {
          await handleTokenRefresh(); // Call the function to refresh the token
        } catch (error) {
          console.error('Failed to refresh access token, logging out:', error);
          logout(); // If refresh fails, log out
        }
      } else {
        // No refresh token available, log out
        set({ isLoggedIn: false });
        return;
      }
    }
  
    // If the access token is valid, update the store
    set({ isLoggedIn: true, accessToken: storedAccessToken });
  };
  

  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem('stravaRefreshToken');
    if (!refreshToken) {
      logout();
      return;
    }
  
    try {
      const data = await refreshAccessToken(refreshToken);
      const expirationTime = Date.now() + (data.expires_in * 1000); // Update expiration time
      localStorage.setItem('stravaAccessToken', data.access_token);
      localStorage.setItem('stravaRefreshToken', data.refresh_token);
      localStorage.setItem('tokenExpiry', expirationTime);
      set({ accessToken: data.access_token, refreshToken: data.refresh_token, isLoggedIn: true });
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      logout();
    }
  };

  const logout = () => {
    clearTokensFromLocalStorage();
    set({ isLoggedIn: false, accessToken: '', refreshToken: '', isLoading: false });
  }
  
  const validateAccessToken = async () => {
    try {
      console.log('stravaClient', stravaClient)
      
      const response = await stravaClient.get('/athlete');
      if (response.status === 200) {
        return true; // Token is valid
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Token is expired or invalid, try refreshing
        try {
          await refreshAccessToken();
          return true; // Token refreshed successfully
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }
      console.error('Token validation failed:', error);
      set({ isLoggedIn: false, accessToken: '', refreshToken: '' });
      localStorage.removeItem('stravaAccessToken');
      localStorage.removeItem('stravaRefreshToken');
      return false;
    }
  }

  return {
    ...getTokenFromLocalStorage(),
    isLoggedIn: !!localStorage.getItem('stravaAccessToken'),
    isLoading: false,

    initiateStravaAuth: () => {
      const { origin } = window;
      const redirectUri = `${origin}/auth/callback`;
      const stravaAuthUrl = `${STRAVA_BASE_URL}/oauth/authorize?client_id=${REACT_APP_STRAVA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=read_all,profile:read_all,activity:read_all`;
      window.location.assign(stravaAuthUrl);
    },

    exchangeCodeForToken: async (code) => {
      set({ isLoading: true });
      try {
        const data = await exchangeCodeForToken(code);
        setTokensInLocalStorage(data.access_token, data.refresh_token);
        set({
          isLoggedIn: true,
          ...getTokenFromLocalStorage(),
          isLoading: false,
        });
      } catch (error) {
        console.error('exchangeCodeForToken:', error);
        set({ isLoading: false });
        throw error;
      }
    },

    refreshAccessToken: async () => {
      set({ isLoading: true });
      try {
        const data = await refreshAccessToken(localStorage.getItem('stravaRefreshToken'));
        setTokensInLocalStorage(data.access_token, data.refresh_token);
        set({
          ...getTokenFromLocalStorage(),
          isLoading: false,
        });
      } catch (error) {
        console.error('refreshAccessToken error:', error);
        set({ isLoading: false });
        throw error;
      }
    },
    checkAuthStatus: checkAuthStatus,
    logout: logout,
    validateAccessToken: validateAccessToken,
    
  };
});

export default useAuthStore;
