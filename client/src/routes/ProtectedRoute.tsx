import {Navigate} from 'react-router-dom';
import {ReactNode} from 'react';

import useAuth from '../hooks/useAuth';

type ProtectedRouteProps = {
  element: React.ComponentType<any>;
  rest?: any; // Specify a more precise type for the rest of the props
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element: Component, ...rest}) => {
  const auth = useAuth();

  return auth?.isLoggedIn ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
