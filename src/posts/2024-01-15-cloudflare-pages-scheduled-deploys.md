---
title: 'Cloudflare Pages Cron Deploys'
description: 'Scheduling static site deploys daily'
date: '2024-01-15T09:00:00.000-05:00'
tags:
- 11ty
- eleventy
- cloudflare
- devops
---

Cloudflare Pages are great to host static sites like 11ty. Cloudflare also supplies workers that can be configured on cron jobs for various things, like deploying your static site. And to get build-time webmentions to update, deploying daily feels like the right thing to do.

---

> + This post assumes you already have Cloudflare Pages setup to host your static site
> + Thanks to this [Codemzy post](https://www.codemzy.com/blog/scheduling-builds-cloudflare) for laying out the rough plan

## Why (AKA Webmentions)

Worked a bit to get webmentions all wired up on the site! Thanks a ton to [Bob Monsour](https://www.bobmonsour.com/posts/adding-webmentions-to-my-site/) and [Robb Knight](https://rknight.me/blog/adding-webmentions-to-your-site/) and a bunch of others for their posts, inspiration, and initial 11ty code and designs to use as examples.

The beauty of the webmentions is that they pull mastodon comments only at build(!) time. This is pretty great as it requires no client-side JS to make the magic happen. The downside is that webmentions won't show up until a build happens.

Now ideally we could trigger builds whenever a mention happens. But that seems like overkill. So as a compromise I wanted to setup builds twice a day. Which is honestly already optimistically too many builds -- plus ==Cloudflare gives 500 builds a month, so using 60 builds still seems like a lot==. So I decided to dial it back to 1 build a day.

## How

1. Setup A Deploy Webhook

+ From `Workers & Pages > Overview` click into your project
+ Then under `Settings > Builds & Deployments` click to `Add deploy hook`
+ Give it a name like `scheduled-deploys`
+ Copy the deploy hook with the api key on it

2. Setup the Worker

+ From `Workers & Pages > Overview` click `Create application`
+ Then `Create Worker`
+ Give it a name like `scheduled-deploys` and click Deploy

3. Edit the Code

Here's what I ended up with. Nothing too fancy.

```javascript
export default {
  async fetch(request, env, ctx) {
    const deployHook = "<paste your deploy hook here>";
    
    await fetch(deployHook, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    
    return new Response("Deploy initiated");
  },
};
```

+ Once done, click `Save and deploy`
+ You can now test it out by hitting the `Send` button in the test area. If you go back to your Pages you can see a deploy is initiated.

4. Setup a Cron Trigger

+ On the worker page, click on the `Triggers` tab
+ Click to `Add Cron Trigger`
+ Setup how often you'd like yours to run. I went with `0 9 * * *` to run at 9:00UTC daily which is 5AM US EST (or EDT I don't know, timezones are my kryptonite)
+ Take a peek at the "execution summary" area to see that it runs at the times you expect. Kinda nice because cron triggers are always kinda confusing 🙃

{% imagePlaceholder "./src/assets/images/posts/cloudflare-cron-trigger.jpg", "Cloudflare Cron Trigger" %}

5. Check it in the morning

And with any luck, maybe there will even be a webmention at the bottom of this post in the morning. Or maybe not. But either way the cron job will deploy it 😍