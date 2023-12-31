import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap"
//import "bootstrap/dist/css/bootstrap.min.css"
import './assets/custom.scss'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
