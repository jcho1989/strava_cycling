import {create} from 'zustand';
import {STRAVA_BASE_URL} from '../constants';
import {stravaClient} from '../services/api/stravaClient';


const REACT_APP_STRAVA_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  isLoading: false, // Add loading state

  initiateStravaAuth: () => {
    const { origin } = window;
    const redirectUri = `${origin}/auth/callback`;

    const stravaAuthUrl = `${STRAVA_BASE_URL}/oauth/authorize?client_id=${REACT_APP_STRAVA_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=read_all,profile:read_all,activity:read_all`;
    window.location.assign(stravaAuthUrl);
  },

  exchangeCodeForToken: async (code) => {
    set({ isLoading: true }); // Set loading state

    try {
      const data = await stravaClient.exchangeCodeForToken(code);
      set({
        isLoggedIn: true,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isLoading: false, // Clear loading state
      });
      localStorage.setItem('stravaAccessToken', data.access_token);
      localStorage.setItem('stravaRefreshToken', data.refresh_token);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      set({ isLoading: false }); // Clear loading state on error
      throw error;
    }
  },

  refreshAccessToken: async () => {
    set({ isLoading: true }); // Set loading state

    const refreshToken = localStorage.getItem('stravaRefreshToken');

    try {
      const data = await stravaClient.refreshAccessToken(refreshToken);
      set({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isLoading: false, // Clear loading state
      });
      localStorage.setItem('stravaAccessToken', data.access_token);
      localStorage.setItem('stravaRefreshToken', data.refresh_token);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      set({ isLoading: false }); // Clear loading state on error
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
    set({ isLoggedIn: false, accessToken: '', refreshToken: '', isLoading: false }); // Clear loading state on logout
  },
}));

export default useAuthStore;