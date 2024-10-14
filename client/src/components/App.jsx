import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

import { AuthProvider } from '../context/AuthContext';
import PublicRouter from './PublicRouter/PublicRouter';

import useAuthStore from '../store/useAuthStore';

import '@mantine/core/styles.css';
import './App.css';


export default function App() {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  
  return (
    <MantineProvider>
      <AuthProvider>
        <div className="App">
          <PublicRouter/>
        </div>
      </AuthProvider>
    </MantineProvider>
  );
}
