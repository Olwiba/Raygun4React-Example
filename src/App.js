import { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation 
} from "react-router-dom";
import rg4js from 'raygun4js';

import reportWebVitals from './reportWebVitals';
import logo from './logo.svg';
import './App.css';

function App() {
  rg4js('apiKey', `${process.env.REACT_APP_RAYGUN_API_KEY}`);
  rg4js('enableCrashReporting', true);
  rg4js('enablePulse', true);
  rg4js('boot');

  let location = useLocation();

  useEffect(function() {
    rg4js('trackEvent', { type: 'pageView', path: location.pathname });
  }, [location]);

  function sendMetricToRaygun(metric) {
    rg4js('trackEvent', {
        type: 'customTiming',
        name: metric.name,    
        duration: metric.value,
    });
  }

  reportWebVitals(sendMetricToRaygun);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Page(message) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        {message}
      </p>
    </header>
  );
}

function Home() { return Page("Welcome to React"); }
function About() { return Page("About"); }
function Users() { return Page("Users"); }

export default App;
