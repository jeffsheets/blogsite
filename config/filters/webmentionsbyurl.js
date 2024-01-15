const sanitizeHTML = require("sanitize-html");
const meta = require('../../src/_data/meta');

/**
 * Remixed via heavy inspiration from https://www.bobmonsour.com/posts/adding-webmentions-to-my-site/
 */
function webmentionsByUrl(webmentions, url) {
  const allowedTypes = {
    likes: ["like-of"],
    reposts: ["repost-of"],
    comments: ["mention-of", "in-reply-to"],
  };

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

  const pageWebmentions = webmentions
    .filter(
      (mention) => mention["wm-target"] === meta.authorWebsite + url
    )
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

  const mentionCount = likes.length + reposts.length + comments.length;
  return { likes, reposts, comments, mentionCount };
}

module.exports = { webmentionsByUrl };