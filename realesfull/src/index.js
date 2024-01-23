
import React from 'react';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { UserDetailProvider } from './Context/userDetailContext';
// import { ContextProvider } from './Context/Contex';
import { ContexProvider } from './Context/Contex';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));



// const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MantineProvider>
    <ContexProvider>
      <UserDetailProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </UserDetailProvider>
    </ContexProvider>
  </MantineProvider>
);
