import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { darkTheme,lightTheme } from './Theme';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>    
    <RecoilRoot>      
      <ThemeProvider theme={darkTheme}>
        <HelmetProvider>
          <App />    
        </HelmetProvider>        
      </ThemeProvider>
    </RecoilRoot>  
  </React.StrictMode>
);

