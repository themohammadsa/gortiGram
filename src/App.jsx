import React from 'react';
import { Router } from './components/router/Router';
import './App.css';
import { Header } from './components/header/Header';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <div className="border">
        <Box
          width={['100%', '100%', '100%', '70%']}
          m="auto"
          className="header"
        >
          <Header />
        </Box>
      </div>
      <Box width={['95%', '95%', '90%', '70%']} m="auto">
        <Router />
      </Box>
    </div>
  );
}

export default App;
