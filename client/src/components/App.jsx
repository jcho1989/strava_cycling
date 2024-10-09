import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { AuthProvider } from '../context/AuthContext';
import Token from './Token/Token';
import AuthPage from './AuthPage/AuthPage';
import AuthCallback from './AuthCallback/AuthCallback';
import AuthorizedApp from './AuthorizedApp/AuthorizedApp';
import ProtectedRoute from '../routes/ProtectedRoute';

import useAuthStore from '../store/useAuthStore';
import { PATHS } from '../constants';

import '@mantine/core/styles.css';
import './App.css';

const { AUTH_CALLBACK, TOKEN, MAIN } = PATHS;

export default function App() {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path={AUTH_CALLBACK} element={<AuthCallback />} />
              <Route path={TOKEN} element={<Token />} />
              <Route path={MAIN} element={<ProtectedRoute element={AuthorizedApp} />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}
