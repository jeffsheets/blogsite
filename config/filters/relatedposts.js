const IGNORED_TAGS = ['all', 'nav', 'post', 'posts'];

const realTags = item => (item.data.tags || []).filter(tag => !IGNORED_TAGS.includes(tag));

/**
 * Posts sharing the most tags with the current page, ties broken by closest publish date.
 * Posts with no shared tags are excluded, so untagged (old Blogger) posts get nothing here.
 */
const relatedPosts = (posts, page, count = 3) => {
  const current = posts.find(post => post.url === page.url);
  if (!current) return [];

  const currentTags = new Set(realTags(current).map(tag => tag.toLowerCase()));
  if (currentTags.size === 0) return [];

  return posts
    .filter(post => post.url !== current.url)
    .map(post => ({
      post,
      score: realTags(post).filter(tag => currentTags.has(tag.toLowerCase())).length,
      distance: Math.abs(post.date - current.date)
    }))
    .filter(({score}) => score > 0)
    .sort((a, b) => b.score - a.score || a.distance - b.distance)
    .slice(0, count)
    .map(({post}) => post);
};

/** Whole years between the given date and now. */
const yearsAgo = date => {
  const then = new Date(date);
  const now = new Date();
  let years = now.getFullYear() - then.getFullYear();
  const beforeAnniversary =
    now.getMonth() < then.getMonth() ||
    (now.getMonth() === then.getMonth() && now.getDate() < then.getDate());
  return beforeAnniversary ? years - 1 : years;
};

module.exports = {relatedPosts, yearsAgo};
