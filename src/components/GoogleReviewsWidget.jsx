import React, { useEffect } from 'react';

// Replace with your Elfsight widget ID after creating the widget at
// https://elfsight.com/google-reviews-widget/create/
const ELFSIGHT_WIDGET_ID = 'REPLACE_WITH_YOUR_WIDGET_ID';

const ELFSIGHT_SCRIPT_SRC = 'https://static.elfsight.com/platform/platform.js';

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

  if (ELFSIGHT_WIDGET_ID === 'REPLACE_WITH_YOUR_WIDGET_ID') {
    return (
      <div className="rounded-2xl border border-dune/10 bg-dune/5 p-8 text-center text-dune/60">
        Live Google Reviews will appear here once you add your Elfsight widget ID.
      </div>
    );
  }

  return <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`} />;
}