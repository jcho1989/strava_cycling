import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { exchangeCodeForToken, REACT_APP_STRAVA_CLIENT_ID } from '../services/api/stravaClient';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  initiateStravaAuth: () => void; // Add this line
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('stravaAccessToken');
    if (storedAccessToken) {
      setIsLoggedIn(true);
      setAccessToken(storedAccessToken); // Restore access token
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    localStorage.removeItem('stravaAccessToken');
    localStorage.removeItem('stravaRefreshToken');
    localStorage.removeItem('stravaExpiresAt');
  };

  const initiateStravaAuth = () => {
    const clientId = REACT_APP_STRAVA_CLIENT_ID
    const redirectUri = `${window.location.origin}/auth/callback`;
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read,activity:read`;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, initiateStravaAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
