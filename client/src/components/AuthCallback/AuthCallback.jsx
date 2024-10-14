import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { ROUTE_URLS } from '../../constants/routes';
import useAuthStore from '../../store/useAuthStore';

const AuthCallback = () => {
  const location = useLocation();
  const { exchangeCodeForToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (code) {
      exchangeCodeForToken(code)
        .then(() => navigate(ROUTE_URLS.MAIN))
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
          navigate(ROUTE_URLS.LOGOUT);
        });
    }
  }, [location.search, exchangeCodeForToken, navigate]);

  return <div>(AuthCallback) Authenticating... Please wait.</div>;
};

export default AuthCallback;
