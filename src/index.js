import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import rg4js from 'raygun4js';

import './index.css';
import App from './App';

rg4js('apiKey', process.env.REACT_APP_RAYGUN_API_KEY);
rg4js('enableCrashReporting', true);
rg4js('enablePulse', true);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

