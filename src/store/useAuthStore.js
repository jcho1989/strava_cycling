import {create} from 'zustand';
import {STRAVA_BASE_URL} from '../constants';

const REACT_APP_STRAVA_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const REACT_APP_STRAVA_CLIENT_SECRET= import.meta.env.VITE_APP_CLIENT_SECRET;

console.log(import.meta.env)

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  isLoading: false, // Add loading state
  
  // Function to initiate Strava authentication
  initiateStravaAuth: async () => {
    set({ isLoading: true }); // Set loading state

    const { origin } = window;
    const clientId = REACT_APP_STRAVA_CLIENT_ID;
    const redirectUri = `${origin}/auth/callback`;

    const stravaAuthUrl = `${STRAVA_BASE_URL}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read_all,profile:read_all,activity:read_all`;
    window.location.assign(stravaAuthUrl);
  },

  // Function to exchange code for access token
  exchangeCodeForToken: async (code) => {
    set({ isLoading: true }); // Set loading state

    const clientId = REACT_APP_STRAVA_CLIENT_ID;
    const clientSecret = REACT_APP_STRAVA_CLIENT_SECRET;
    const redirectUri = `${window.location.origin}/auth/callback`;

    try {
      const response = await fetch(`${STRAVA_BASE_URL}/api/v3/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
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

  // Function to refresh access token using refresh token
  refreshAccessToken: async () => {
    set({ isLoading: true }); // Set loading state

    const clientId = REACT_APP_STRAVA_CLIENT_ID;
    const clientSecret = REACT_APP_STRAVA_CLIENT_SECRET;
    const refreshToken = localStorage.getItem('stravaRefreshToken');

    try {
      const response = await fetch(`${STRAVA_BASE_URL}/api/v3/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }

      const data = await response.json();
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

  // Function to check authentication status on app load
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

  // Function to logout
  logout: () => {
    localStorage.removeItem('stravaAccessToken');
    localStorage.removeItem('stravaRefreshToken');
    set({ isLoggedIn: false, accessToken: '', refreshToken: '', isLoading: false }); // Clear loading state on logout
  },
}));

export default useAuthStore;