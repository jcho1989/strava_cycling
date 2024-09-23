import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { exchangeCodeForToken } from '../../services/api/stravaClient';
import useAuth from '../../hooks/useAuth';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function

  useEffect(() => {
    const { code } = queryString.parse(window.location.search);
    if (code) {
      exchangeCodeForToken(code as string) // Call the function directly
        .then((data) => {
          // Assuming data contains access_token, refresh_token, expires_at
          localStorage.setItem('stravaAccessToken', data.access_token);
          localStorage.setItem('stravaRefreshToken', data.refresh_token);
          localStorage.setItem('stravaExpiresAt', data.expires_at);
          login(); // Call login to set the context
          navigate('/'); // Redirect after successful authentication
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        });
    } else {
      navigate('/');
    }
  }, [navigate, login]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
