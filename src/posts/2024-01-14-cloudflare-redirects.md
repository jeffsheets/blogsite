---
title: 'Cloudflare _redirects'
description: 'Keeping old paths alive on the new site'
tags:
- 11ty
- eleventy
- cloudflare
- rss
---

Moved my blog over here to Eleventy land from Blogger universe a [few weeks back](https://sheetsj.com/blog/migrating-blogger-to-eleventy/) and focused on keeping old link paths alive to the legacy blogposts. This way any published links to the posts would continue working once everything was moved over. And now thanks to [Kev Quirk's](https://fosstodon.org/@kev) [post](https://kevquirk.com/dont-change-your-rss-url) I realized the RSS feed URL was inadvertently broken in the process. So this weekend I set about to point the old Blogger RSS location of `/feeds/posts/default` to redirect to the new 11ty location of `/feed.xml` 

---

## Cloudflare Redirects

This approach is pretty tied to my use of Cloudflare Pages and their [_redirects](https://developers.cloudflare.com/pages/configuration/redirects/) capability. I stumbled upon it, as the 11ty template I'm using already had a `_redirects.njk` file and I found a [post describing](https://eleventy-excellent.netlify.app/blog/post-with-301-redirects/) how this [takes advantage](https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/) of [Netlify _redirects](https://docs.netlify.com/routing/redirects/). Thankfully Cloudflare uses the same pattern so nothing really needed to change with the implementation.

Adding this line to my _redirects.njk file did the trick:
`/feeds/posts/default /feed.xml 301`

As I [mentioned on mastodon](https://elk.zone/hachyderm.io/@jeffsheets/111749929456672194) I can't imagine anyone was linking to the old sheetsj.com, but now the RSS feed will magically resurrect my blog for that one person who still subscribed 🎉