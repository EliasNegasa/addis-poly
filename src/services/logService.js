// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
    // Sentry.init({
    //   dsn:
    //     "https://0a26079e4c414c5e8c046e3ab9773788@o452708.ingest.sentry.io/5440543",
    //   integrations: [new Integrations.BrowserTracing()],
    //   tracesSampleRate: 1.0,
    // });
  }
  
  function log(error) {
    console.warn("ERROR OCCURED: ", error);
    // Sentry.captureException(error);
  }
  
  export default {
    init,
    log,
  };
  