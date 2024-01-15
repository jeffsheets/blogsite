// Fetch webmentions from webmention.io API

const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  const WEBMENTIONS_KEY = process.env.WEBMENTIONS_KEY;
  const url = `https://webmention.io/api/mentions.jf2?token=${WEBMENTIONS_KEY}&per-page=1000`;
  const res = EleventyFetch(url, {
    duration: "1h",
    type: "json",
  });
  const webmentions = await res;
  return {
    mentions: webmentions.children,
  };
};
