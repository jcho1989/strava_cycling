import React from 'react'
import { useState } from 'react'



import './App.css'

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import BasePage from './BasePage/BasePage'

export default function App() {
  const [count, setCount] = useState(0)
  return (
  <MantineProvider>
    <Switch>
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/token" exact component={Token} />
      <Route path="/" exact component={HomePage} />
    </Switch>
  </MantineProvider>
  );
}