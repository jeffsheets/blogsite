---
title: 'Migrating Blogger to Eleventy'
description: 'Shifting sheetsj.com into the future'
date: '2023-10-13T09:00:00.000-05:00'
tags:
- eleventy
- jamstack
- blogger
---

Blogging for me has always been one of those background processes that just keeps running -- consistently there,
reliable, and probably created with a script so many years ago that now slowly gathers dust over time. After 19‼️ years
of sheetsj.com running on [Blogger](https://blogger.com), and watching various (👋Wordpress) trends (👋Jekyll) come
and go (👋Hugo), I finally jumped to [Eleventy](https://11ty.dev).

---

### Why now?
I don't know. Maybe it's time when the blog is as old as your oldest child and she goes off to college.
Or maybe when your baseball team is the Twins and they 
[finally win a playoff game](https://www.mlb.com/news/twins-win-game-1-al-wild-card-series-2023) after those same 19 years. 
Or maybe, it's finally time to continue moving away the shady tracking side of the google-verse.

But in reality? I like things that run forever. With very little thought. I also like free (as in beer and as in money).
Blogger might be old but it was _always_ dependable. It's looked dated for years now though (you can still see my old
blog for now at https://uncommentedbytes.blogspot.com). And it comes from a time
when server-side database-backed blogs were a thing (i mean i was originally on jroller before blogger came around.
And who remembers when blogger was implementation agnostic and FTP'd files around for you??).

Eleventy checks all the right boxes. Super easy, JAMstack-y, beautiful templates (Thanks 
[eleventy-excellent](https://github.com/madrilene/eleventy-excellent)), great community, 
[open source](https://github.com/11ty/eleventy/), and fast!

---

### But how?
You'll be **_very_** unsurprised to hear that there are approximately **ZERO** blogposts on the internet today describing ["how
to migrate from Blogger to 11ty"](https://www.google.com/search?q=how+to+migrate+from+Blogger+to+11ty). Plenty of 
[Blogger or Wordpress to Jekyll](https://dev.to/rupeshtiwari/importing-wordpress-or-blogger-blogs-to-jekyll-blog-mpg)
or [Jekyll to 11ty](https://kittygiraudel.com/2020/11/30/from-jekyll-to-11ty/) or
[Wordpress to 11ty](https://www.smashingmagazine.com/2020/12/wordpress-eleventy-static-site-generator/) though.

I found the [Jekyll Importer tool](https://import.jekyllrb.com/docs/blogger/) that can transform the Blogger backup
xml file into Jekyll HTML files. So I set about to go Blogger -> Jekyll -> 11ty and to my surprise it was quick and
relatively painless!

### TL;DR; already please
for the super impatient here's [my mastodon post](https://elk.zone/hachyderm.io/@jeffsheets/111140679316431910) below
{% imagePlaceholder "./src/assets/images/posts/blogger-to-eleventy-mastodon.png", "Mastodon post with eleventy migration steps", "whatevs" %}

1. Export Blogger content to the [backup xml file](https://support.google.com/blogger/answer/41387?visit_id=638328463493677559-1019383255&rd=1)
2. Run the Jekyll Blogger [import script](https://import.jekyllrb.com/docs/blogger/)
3. Rename all .html to .md files
4. Replace all "blogger_orig_url: sheetsj.com/" with "permalink: " to keep blogger URL format
5. Copy the posts into your favorite 11ty template posts folder. I like [eleventy-excellent](https://github.com/madrilene/eleventy-excellent/tree/main)
6. Push to your github repo
7. Deploy to [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
8. Setup [Cloudflare DNS](https://developers.cloudflare.com/pages/platform/custom-domains/) and swap to it
9. Login to sheetsj.com and see all the beautiful-ness
10. pretend you'll blog more now

## Minor other updates
I can't remember all the tiny changes I made. But some little things like:
- disabled the avif image support in the imagePlaceholder js, as it wasn't working for some reason
- set `breaks: false` in the markdown config
- added pagination to the blog posts page
- Oh, and fixed a weird date issue by specifying the timezone of each post in each file