const REACT_APP_STRAVA_CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const REACT_APP_STRAVA_CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;

import {STRAVA_BASE_URL} from "../../constants";

export const stravaClient = {
  async exchangeCodeForToken(code) {
    const response = await fetch(`${STRAVA_BASE_URL}/api/v3/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: REACT_APP_STRAVA_CLIENT_ID,
        client_secret: REACT_APP_STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return response.json();
  },

  async refreshAccessToken(refreshToken) {
    const response = await fetch(`${STRAVA_BASE_URL}/api/v3/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: REACT_APP_STRAVA_CLIENT_ID,
        client_secret: REACT_APP_STRAVA_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    return response.json();
  },

  async getActivities(accessToken) {
    const response = await fetch(`${STRAVA_BASE_URL}/api/v3/athlete/activities`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }

    return response.json();
  },

  // Add other API calls as needed...
};
