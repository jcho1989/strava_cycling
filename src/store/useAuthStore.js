import {create} from 'zustand';

import {STRAVA_BASE_URL} from '../constants';
import {exchangeCodeForToken, refreshAccessToken} from '../services/api/stravaClient';

const REACT_APP_STRAVA_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;



const useAuthStore = create((set) => {
  const storedAccessToken = localStorage.getItem('stravaAccessToken');
  const storedRefreshToken = localStorage.getItem('stravaRefreshToken');

  return {
    isLoggedIn: !!storedAccessToken, // Set isLoggedIn based on presence of accessToken
    accessToken: storedAccessToken || '',
    refreshToken: storedRefreshToken || '',
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
      set({
        isLoggedIn: true,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isLoading: false,
      });
      localStorage.setItem('stravaAccessToken', data.access_token);
      localStorage.setItem('stravaRefreshToken', data.refresh_token);
    } catch (error) {
      console.error('exchangeCodeForToken:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  refreshAccessToken: async () => {
    set({ isLoading: true });
    try {
      const refreshToken = localStorage.getItem('stravaRefreshToken');
      const data = await refreshAccessToken(refreshToken);
      set({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isLoading: false,
      });
      localStorage.setItem('stravaAccessToken', data.access_token);
      localStorage.setItem('stravaRefreshToken', data.refresh_token);
    } catch (error) {
      console.error('refreshAccessToken error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  checkAuthStatus: () => {
    const storedAccessToken = localStorage.getItem('stravaAccessToken');
    const storedRefreshToken = localStorage.getItem('stravaRefreshToken');
    if (storedAccessToken) {
      set({
        isLoggedIn: true,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('stravaAccessToken');
    localStorage.removeItem('stravaRefreshToken');
    set({ isLoggedIn: false, accessToken: '', refreshToken: '', isLoading: false });
  },
}}
);

export default useAuthStore;
