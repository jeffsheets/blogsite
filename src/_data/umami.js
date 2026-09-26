const EleventyFetch = require("@11ty/eleventy-fetch");
const meta = require('./meta');

// Fetch site stats and metrics from umami for past 3 months
module.exports = async function () {
  const UMAMI_KEY = process.env.UMAMI_KEY;
  // umami cloud API keys now require a Pro plan, so skip gracefully without one
  if (!UMAMI_KEY) {
    return { metrics: [] };
  }

  
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
  let metrics;
  try {
    metrics = await response;
  } catch (e) {
    console.warn(`[umami] skipping stats: ${e.message}`);
    return { metrics: [] };
  }
  
  // decode path URI for emoji characters
  return {
    metrics: metrics.map(it => ({
      path: decodeURI(it.x),
      count: it.y
    }))
  };
};
