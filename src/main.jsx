import React from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'

import './style.css';
import './demo-3.css';
import './index.css';
import './bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
