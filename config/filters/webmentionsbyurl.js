const sanitizeHTML = require("sanitize-html");
const meta = require('../../src/_data/meta');

const sanitize = (entry) => {
  if (entry.content && entry.content.html) {
    return {
      ...entry,
      content: sanitizeHTML(entry.content.html, {
        allowedTags: ["b", "i", "em", "strong", "a"],
      }).replace(/\?\?\?\?/g, '')
    }
  }
  return entry;
};

/**
 * Remixed via heavy inspiration from https://www.bobmonsour.com/posts/adding-webmentions-to-my-site/
 */
function webmentionsByUrl(webmentions, url) {
  const allowedTypes = {
    likes: ["like-of"],
    reposts: ["repost-of"],
    comments: ["mention-of", "in-reply-to"],
  };
  const allTypes = [...allowedTypes.likes, ...allowedTypes.reposts, ...allowedTypes.comments];

  const pageWebmentions = webmentions
    .filter(
      (mention) => mention["wm-target"] === encodeURI(meta.authorWebsite + url)
    )
    .filter(it => allTypes.includes(it["wm-property"]))
    .sort((a, b) => new Date(a.published) - new Date(b.published))
    .map(sanitize);

  const likes = pageWebmentions
    .filter((mention) => allowedTypes.likes.includes(mention["wm-property"]))
    .filter((like) => like.author)
    .map((like) => like.author);

  const reposts = pageWebmentions
    .filter((mention) => allowedTypes.reposts.includes(mention["wm-property"]))
    .filter((repost) => repost.author)
    .map((repost) => repost.author);

  const comments = pageWebmentions
    .filter((mention) => allowedTypes.comments.includes(mention["wm-property"]))
    .filter((comment) => {
      const { author, published, content } = comment;
      return author && author.name && published && content;
    });
  
  // Super high probability this is the mastodon url, though not exact
  const mastodonUrl = pageWebmentions.length > 0 && pageWebmentions[0].url.split('#')[0];
  
  return { likes: likes.length, reposts: reposts.length, comments: comments.length, mastodonUrl, mentionCount: pageWebmentions.length };
}

module.exports = { webmentionsByUrl };