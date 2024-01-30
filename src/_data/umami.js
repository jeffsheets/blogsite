const EleventyFetch = require("@11ty/eleventy-fetch");
const meta = require('./meta');

// Fetch site stats and metrics from umami for top 5 blog pages in last 90 days
module.exports = async function () {
  const UMAMI_KEY = process.env.UMAMI_KEY;
  const startAt = 1698635468000; // now - 3months
  const endAt = 1706587199999; // now
  const url = `https://api.umami.is/v1/websites/${meta.umami.websiteId}/metrics?startAt=${startAt}&endAt=${endAt}&type=url`;
  const res = EleventyFetch(url, {
    duration: "1h",
    type: "json",
    fetchOptions: {
      headers: {
        'x-umami-api-key': UMAMI_KEY
      }
    }
  });
  // [{x: '/', y: 177}, ...]
  const metrics = await res;
  const topPages = metrics.filter(it => it.x.match(/^\/blog\/.+/)).slice(0, 5).map(it => ({
    path: decodeURI(it.x),
    count: it.y
  }));
  return {
    topPages,
  };
};