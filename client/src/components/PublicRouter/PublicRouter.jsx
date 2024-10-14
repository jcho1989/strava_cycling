import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AuthPage from "../AuthPage/AuthPage";
import AuthCallback from "../AuthCallback/AuthCallback";
import Token from "../Token/Token";
import ProtectedRoute from "../../routes/ProtectedRoute";
import AuthorizedApp from "../AuthorizedApp/AuthorizedApp";
import Logout from "../Logout/Logout";

import { ROUTE_URLS } from '../../constants/routes';
import useAuthStore from '../../store/useAuthStore';
import {useCallback, useEffect} from 'react';

const { AUTH_CALLBACK, TOKEN, MAIN, LOGOUT, LOGIN } = ROUTE_URLS;

function CheckAuth() {
  const {validateAccessToken} = useAuthStore()
  // useEffect(() => {

  // })

  return <>auth check</>
}

export default function PublicRouter() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={LOGIN} element={<AuthPage />} />
          <Route path={AUTH_CALLBACK} element={<AuthCallback />} />
          <Route path={TOKEN} element={<Token />} />
          <Route
            path={MAIN}
            element={<ProtectedRoute element={AuthorizedApp} />}
          />
          <Route path={LOGOUT} element={<Logout />} />
          <Route path={'/'} element={<CheckAuth />} />
        </Routes>
      </div>
    </Router>
  );
}
