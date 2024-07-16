import React, { useState } from 'react'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import BasePage from './BasePage/BasePage'
import Token from './Token/Token';
import AuthCallback from './AuthCallback/AuthCallback';
import AuthorizedApp from './AuthorizedApp/AuthorizedApp';

import './App.css'
import '@mantine/core/styles.css';


export default function App() {

  return (
    <MantineProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<BasePage/>} />
            <Route path="/auth/callback" element={<AuthCallback/>} />
            <Route path="/token" exact element={<Token/>} />
            <Route path="/main" exact element={<AuthorizedApp/>} />
          </Routes>
        </div>
      </Router>
    </MantineProvider>
  );
}