const EleventyFetch = require("@11ty/eleventy-fetch");
const meta = require('./meta');

// Fetch site stats and metrics from umami for top 5 blog pages in last 90 days
module.exports = async function () {
  const UMAMI_KEY = process.env.UMAMI_KEY;
  var start = new Date();
  start.setMonth(start.getMonth() - 3);
  const startAt = start.getTime(); // now - 3months
  const endAt = Date.now(); // now
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
  const topPages = metrics.filter(it => it.x.match(/^\/blog\/.+/)).slice(0, 7).map(it => ({
    path: decodeURI(it.x),
    count: it.y
  }));
  return {
    topPages,
  };
};
