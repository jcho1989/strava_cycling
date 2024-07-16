import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'; // React Router's useLocation hook
import queryString from 'query-string';

import useAuthStore from '../../store/useAuthStore';

const AuthCallback = () => {

  const location = useLocation();
  const { exchangeCodeForToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (code) {
      exchangeCodeForToken(code)
        .then(() => {
          navigate('/main');
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, [location.search, exchangeCodeForToken, navigate]);

  return (
    <div>
      Authenticating... Please wait.
    </div>
  );
};

export default AuthCallback;
