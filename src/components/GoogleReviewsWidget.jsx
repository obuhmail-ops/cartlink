import React, { useEffect } from 'react';

const ELFSIGHT_WIDGET_ID = '8336f879-b9a6-4d17-94d0-13cdc0fbd04b';

const ELFSIGHT_SCRIPT_SRC = 'https://elfsightcdn.com/platform.js';

export default function GoogleReviewsWidget() {
  useEffect(() => {
    // Load the Elfsight platform script once.
    if (!document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = ELFSIGHT_SCRIPT_SRC;
      script.setAttribute('data-use-service-core', '');
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`} data-elfsight-app-lazy />;
}