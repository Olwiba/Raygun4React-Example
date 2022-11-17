import { useEffect, useState } from "react";
import rg4js from 'raygun4js';
import logo from './logo.svg';

// For usage: Remove the <React.StrictMode> wrapper from src\index.js
// otherise you will notice double mounting.

function LoggedRenderComponent() {
  const [renderTimeState, setRenderTimeState] = useState(0);
  let boot = window.performance ? performance.now() : 0;

  useEffect(() => {
    const renderTime = window.performance ? performance.now() - boot : 0;
    console.log(`Component render time: ${renderTime}ms`);
    setRenderTimeState(renderTime);

    rg4js('trackEvent', {
      type: 'customTiming',
      name: 'render',
      duration: renderTime
    });
  }, [boot]);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        {`I took ${renderTimeState}ms to load ⚡`}
      </p>
    </header>
  );
}

export default LoggedRenderComponent;