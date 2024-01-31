const EleventyFetch = require("@11ty/eleventy-fetch");
const meta = require('./meta');

// Fetch site stats and metrics from umami for past 3 months
module.exports = async function () {
  const UMAMI_KEY = process.env.UMAMI_KEY;
  
  const start = new Date();
  start.setMonth(start.getMonth() - 3);
  const startAt = start.getTime(); // now - 3months
  const endAt = Date.now();
  
  const url = `https://api.umami.is/v1/websites/${meta.umami.websiteId}/metrics?startAt=${startAt}&endAt=${endAt}&type=url`;
  const response = EleventyFetch(url, {
    duration: "1h",
    type: "json",
    fetchOptions: {
      headers: {
        'x-umami-api-key': UMAMI_KEY
      }
    }
  });
  // [{x: '/', y: 177}, ...]
  const metrics = await response;
  
  // decode path URI for emoji characters
  return {
    metrics: metrics.map(it => ({
      path: decodeURI(it.x),
      count: it.y
    }))
  };
};
