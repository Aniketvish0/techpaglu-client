    
import  { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import ReactGA from "react-ga4";
ReactGA.initialize("G-HJRLRR66P3");
ReactGA.send({ hitType: "pageview", page: window.location.pathname});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
);