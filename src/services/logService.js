// import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://253524ed99f94c22ae8b2a51b63b3c31@sentry.io/1811693"
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

export default {
  init,
  log
};
