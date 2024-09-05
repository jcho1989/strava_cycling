import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const {isAuthenticated} = useAuth();

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}

export default ProtectedRoute;
