import React from 'react'
import { useState } from 'react'

import viteLogo from '../../vite.svg'

import './App.css'

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import BasePage from './BasePage/BasePage'

export default function App() {
  const [count, setCount] = useState(0)
  return (
  <MantineProvider>
    <BasePage/>
  </MantineProvider>
  );
}