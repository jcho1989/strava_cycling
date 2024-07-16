import React from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import BasePage from './BasePage/BasePage'
import Token from './Token/Token';
import AuthCallback from './AuthCallback/AuthCallback';
import AuthorizedApp from './AuthorizedApp/AuthorizedApp';
import {AuthProvider} from '../context/AuthContext';
import ProtectedRoute from '../routes/ProtectedRoute';

import './App.css'
import '@mantine/core/styles.css';


export default function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<BasePage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/token" element={<Token />} />
              <Route path="/main" element={<ProtectedRoute element={AuthorizedApp} />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}
