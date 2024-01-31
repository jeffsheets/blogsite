
/** Number of days between dates */
function dateDiff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

/** 
 * gets metrics only for our posts, starting with /blog/ or the year like /2019
 */
function filterPosts(umami) {
  if (!umami?.metrics) {
    return [];
  }

  return umami.metrics.filter(it => it.path.match(/^(\/blog\/.+|\/2)/));
}

/** figures out countPerDay using 11ty date and umami count */
function gatherPosts(collections, umami) {
  // wait for posts to exist before processing
  if (!collections?.posts) {
    return [];
  }
  
  return filterPosts(umami).map(umamiPost => {
      const eleventyPost = collections.posts.find(it => it.url.startsWith(umamiPost.path));
      const days = eleventyPost ? Math.max(dateDiff(eleventyPost.date, Date.now()), 1) : 1;
      return ({
        ...umamiPost,
        date: eleventyPost?.date, //paginated pages like /blog/page/1 have no date. so keep blank and filter out below
        countPerDay: umamiPost.count / days,
        days
      });
    }).filter(it => !!it.date);
}

module.exports = {
  eleventyComputed: {
    stats: {
      hotPosts: ({ collections, umami }) => {
        const posts = gatherPosts(collections, umami);
        return posts.sort((a, b) => b.countPerDay - a.countPerDay).slice(0, 7);
      },
      topPosts: ({ umami }) => {
        const posts = filterPosts(umami);
        return posts.sort((a, b) => b.count - a.count).slice(0, 7);
      }
    }
  }
};
