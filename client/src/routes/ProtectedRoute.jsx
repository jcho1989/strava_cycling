import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';
import {ROUTE_URLS} from '../constants/routes';

const ProtectedRoute = ({ element: Component }) => {
  const { isLoggedIn } = useAuthStore();
  
  if (!isLoggedIn) {
    return <Navigate to={ROUTE_URLS.LOGOUT} />;
  }

  return <Component />;
};

export default ProtectedRoute;


ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired
}