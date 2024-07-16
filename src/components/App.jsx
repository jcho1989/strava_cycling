import React from 'react'
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';

import {MantineProvider} from '@mantine/core';

import {PATHS} from '../constants';

import BasePage from './BasePage/BasePage'
import Token from './Token/Token';
import AuthCallback from './AuthCallback/AuthCallback';
import AuthorizedApp from './AuthorizedApp/AuthorizedApp';
import {AuthProvider} from '../context/AuthContext';
import ProtectedRoute from '../routes/ProtectedRoute';

import './App.css'
import '@mantine/core/styles.css';

const {AUTH_CALLBACK, TOKEN, MAIN} = PATHS;


export default function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<BasePage />} />
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
