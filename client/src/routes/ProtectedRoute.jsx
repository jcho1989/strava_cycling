import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ element: Component }) => {
  const { isLoggedIn, validateAccessToken } = useAuthStore();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log('checking auth')
    const checkAuth = async () => {
      const isValidToken = await validateAccessToken();
      setIsValid(isValidToken);
    };

    if (isLoggedIn) {
      checkAuth();
    } else {
      setIsValid(false);
    }
  }, [isLoggedIn, validateAccessToken]);

  // If not logged in or token is invalid, redirect to the home page
  if (!isLoggedIn || !isValid) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;


ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}