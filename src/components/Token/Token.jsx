import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import useAuthStore from '../../store/useAuthStore';

const Token = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    handOffToStravaAuth,
    apiValidateToken,
  } = useAuthStore();

  useEffect(() => {
    const {code} = queryString.parse(history.location.search);
    if (code && !isAuthenticated) {
      apiValidateToken(code)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Error validating token:', error);
        });
    } else if (isAuthenticated) {
      navigate('/main');
    } else {
      handOffToStravaAuth();
    }
  }, [navigate, isAuthenticated, apiValidateToken, handOffToStravaAuth]);

  return <div>Token received</div>;
};

export default Token;
