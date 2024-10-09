import axios from 'axios';

const STRAVA_BASE_URL = 'https://www.strava.com/api/v3';
const REACT_APP_STRAVA_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const REACT_APP_STRAVA_CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;

export const stravaClient = axios.create({
  baseURL: STRAVA_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

stravaClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('stravaAccessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const exchangeCodeForToken = (code) => {
  return stravaClient.post('/oauth/token', {
    client_id: REACT_APP_STRAVA_CLIENT_ID,
    client_secret: REACT_APP_STRAVA_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: `${window.location.origin}/auth/callback`,
  })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error exchanging code for token:', error);
    throw error;
  });
};

export const refreshAccessToken = (refreshToken) => {
  return stravaClient.post('/oauth/token', {
    client_id: REACT_APP_STRAVA_CLIENT_ID,
    client_secret: REACT_APP_STRAVA_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  })
  .then((response) => response.data)
  .catch((error) => {
    console.error('Error refreshing access token:', error);
    throw error;
  });
};
