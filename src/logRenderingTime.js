import { useEffect } from "react";
import rg4js from 'raygun4js';

function logRenderingTime(Component) {
  let boot = 0;

  function LogRenderTime() {
    boot = window.performance ? performance.now() : 0;

    useEffect(() => {
      const renderTime = window.performance ? performance.now() - boot : 0;
      console.log(`${Component} render time: ${renderTime}ms`);

      rg4js('trackEvent', {
        type: 'customTiming',
        name: 'render',
        duration: renderTime
      });
    });

    return <Component {...this.props} />;
  }

  return LogRenderTime;
}

export default logRenderingTime;