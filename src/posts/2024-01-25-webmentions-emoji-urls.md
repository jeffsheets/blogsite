---
title: '💻 Emoji URLs and 11ty Webmentions'
description: 'Not letting emojis drop mentions on the floor'
date: '2024-01-25T09:00:00.000-05:00'
tags:
- 11ty
- emojis
- webmentions
- 💻
---

Webmentions are fun! Emojis 🎉 are fun too! But when they don't work (webmentions or emojis) well then that isn't very fun at all. And when you start diving into [percent encoding emojis](https://en.wikipedia.org/wiki/Percent-encoding) you know your day is about to go 🙃

---

## What you say

For whatever random reason I wrote a post last night that included an emoji in the URL (🍻 specifically). Some thoughts:

1. Wow, 11ty makes a post with an emoji in the URL without any problem! Cool! `https://sheetsj.com/blog/dry-january-beers-🍻/` is the full url for the [link to my post](https://sheetsj.com/blog/dry-january-beers-🍻/). Fun
2. This encoded as `https://sheetsj.com/blog/dry-january-beers-%F0%9F%8D%BB/` when copying and pasting it from Safari into my Mastodon iOS client.
3. Posted late at night, woke up to a few interactions to the post on Mastodon
4. Webmentions did not seem to make it onto the post. Recently hooked up webmentions, so went to verify that I could see interactions there but they were missing -- weird!

## This Web you Mention

Really my fault for tempting fate. In my fedi message (do i have to say "toot"?) I said "Let's see how fedi clients like this link with a 🍻 emoji in it" -- and mastodon gets the last laugh because the iOS and web clients seemed to not care! They worked great!

{% imagePlaceholder "./src/assets/images/posts/emoji-url-toot.jpg", "Fedi message announcing my faux beers post", "https://elk.zone/hachyderm.io/@jeffsheets/111815037788012085" %}

So it was time to dive into the webmentions plumbing. There's a few steps that a toot takes to get from mastodon to the comment section on an 11ty static blog. I'm no webmention expert but I learned from a few early explorers (thanks [Bob](https://www.bobmonsour.com/posts/adding-webmentions-to-my-site/), [Robb](https://rknight.me/blog/adding-webmentions-to-your-site/), [Cory](https://coryd.dev/posts/2023/webmentions-in-eleventy/), and [more](https://11tybundle.dev/categories/webmentions/)!). This is my 15-minutes understanding of how it works:

1. [brid.gy](https://brid.gy/mastodon/@jeffsheets@hachyderm.io) scans the mastodon account every ~30 minutes, and looks for any outgoing links
2. brid.gy loops through the links, and checks if they accept webmentions by looking for a `<link rel="webmention" href="https://webmention.io/sheetsj.com/webmention">` and sends a mention to the href there. \
Checking the dashboard, looks like brid.gy picked up the links:
   {% imagePlaceholder "./src/assets/images/posts/bridgy.jpg", "brid.gy dashboard" %}
3. [webmention.io](https://webmention.io) accepts the webmention and stores it in a database \
   Luckily looks like webmentions.io stored the link too!
   {% imagePlaceholder "./src/assets/images/posts/webmentions.jpg", "webmentions.io dashboard" %}
4. A [cloudflare cron job](https://sheetsj.com/blog/cloudflare-pages-cron-deploys/) that triggers my site to build+deploy at 3AM daily.
5. The 11ty build fetches a webmentions json file, filters for each page, and builds the appropriate html comments/likes/reposts. \
This is where things were amiss!

The code is pulling in the URL but the comparison isn't matching. Turns out 11ty is comparing the encoded URL `https://sheetsj.com/blog/dry-january-beers-🍻/` to the decoded URL `https://sheetsj.com/blog/dry-january-beers-%F0%9F%8D%BB/` 

So the fix was to call encodeURI before the comparison, and now all is good!
```javascript
const pageWebmentions = webmentions.filter(
   (mention) => mention["wm-target"] === encodeURI(meta.authorWebsite + url)
 ).sort((a, b) => new Date(a.published) - new Date(b.published))
 .map(sanitize);
```

## Next steps

- Maybe query mastodon directly at build time instead of using webmention.io + brid.gy? This would also make it possible to show mentions from any author not just when I am the original author (i think? i haven't done much with mastodon search)
- Short of that, could spin up a tiny database and accept the brid.gy mentions to eliminate the webmention.io portion.
- Could setup brid.gy publishing to send mastodon messages when new blogs are posted. But I'll probably find a way to send directly from the 11ty build
- Fix that emoji background masking in the title of my posts
- definitely using more emojis in my URLs 🎉

> Did you know 11ty tags could be emojis too? [https://sheetsj.com/tags/💻/]((/tags/💻/))
