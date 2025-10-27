---
title: "HuskerFinder: Claude Code Shipped my ~20 year old idea"
description: Curing my web author's block
date: '2025-10-27T10:00:00.000-05:00'
tags:
  - AI
  - development
  - productivity
---

I've had this idea in my head for maybe ~17 years. I remember talking about it when iPhone's first started shipping custom apps in the app store. Build a simple website (or app) that tells us Husker fans what radio station is broadcasting the game near wherever I happen to be. That's it. Super simple concept.

Around 10 years ago I started building it as a static website. Figuring out the location distance logistics. Got a basic page going, scraped some station data. Then I'd come back to it every few years, tinker around, add a feature or two, but never felt like it was ready to ship. It always felt incomplete or unpolished or just not quite there yet.

Fast-forward to a few weeks ago and [HuskerFinder](https://huskerfinder.sheetsj.com) is live. What changed? Claude Code.

{% imagePlaceholder "./src/assets/images/posts/huskerfinder.png", "HuskerFinder showing nearby radio stations on an interactive map" %}

## The Web Author's Block Problem

Here's the thing - [I](/about/) [love](https://twitter.sheetsj.com/1185612834991988737/) [building](https://twitter.sheetsj.com/1374171248813608968/) [stuff](https://gaspumpr.com/). But on weekends and evenings after work these days...? I'm tired. My brain is fried from a full day of coding and meetings and architecture decisions. I want to spend hours with my family, and dogs. Especially the dogs 🐶🐶

{% imagePlaceholder "./src/assets/images/posts/my-dogs.jpg", "My dogs - Scout and Finley", "Finley and Scout are the best", "", "300px" %}

So projects like HuskerFinder would sit there. I'd think about them, plan them out in my head, but not much more. It's like writer's block but for web development. Web author's block.

## Switching Roles: From Developer to Product Owner

Claude Code flipped my mindset. Instead of being the engineer who has to implement everything, I became the product owner and architect. I tell Claude Code what I want, review what it builds, guide the direction, make decisions.

Here's how I structure my screen for IntelliJ and Claude Code (I'm not a fan of the IntelliJ CC plugin itself, so I run a separate terminal):

{% imagePlaceholder "./src/assets/images/posts/cc-split-screen.png", "Split screen showing IntelliJ on the left with code, Claude Code terminal on the right" %}

Describe a feature in plain English. Claude Code implements it. Review the changes in IntelliJ, test it out, then either accept it or provide feedback for refinement. Rinse and repeat.

The mental load difference is huge. Instead of "okay I need to set up Leaflet, figure out the marker API, handle the popup state, wire up the click handlers..." I just say "add an interactive map that shows station locations and my current position." Done.

## The Aha Moment

The map view was my aha moment. Dealing with map libraries, figuring out the right one to use, learning the API, positioning markers, handling interactions... ugh.

I mentioned to Claude Code. Within seconds it had added Leaflet.js, set up the map component, added markers for all the stations with custom icons color-coded by sport, implemented popups with station details, and added a user location marker.

This wasn't just a coding assistant that autocompletes functions. This was me being able to focus on product decisions while Claude Code handled the technical grunt work.

## Vibe Engineering > Vibe Coding

To be clear, I'm not just prompting and shipping blindly. I still review every change. I still make architectural decisions. I still catch bugs and edge cases. I still write some code myself when I want to.

Now though I'm spending my mental energy on the interesting problems - the product decisions, the user experience, the vision - not on "how do I calculate the distance between two lat/long coordinates".

I'm automating the rough edges that I don't want to mentally juggle at the moment. I'm conducting the orchestra.

## Static Sites FTW

This project is a static site. Just HTML, CSS, and vanilla JavaScript. No backend servers, no databases, no complex deployment pipelines.

This is the sweet spot for GenAI development:
- **No backend to manage** - No servers to configure, no APIs to secure, no database migrations
- **Easy deployment** - Push to GitHub, let GitHub Pages handle the rest. Done.
- **SEO-friendly** - Search engines love static HTML. No client-side rendering gymnastics.
- **Free hosting** - GitHub Pages, Cloudflare Pages, etc... all free for static sites
- **Fast** - No server round trips, just cached HTML and assets

Static sites let you focus on the product, not the infrastructure.

Claude Code excels at this. "Add a map view" works great when you don't also need to wire up backend endpoints, authentication, and data persistence. It's just DOM manipulation and client-side logic. Ship it.

## Shipped

So yeah, 20-year-old idea, started building it 10 years ago, finally shipped it in a few weeks once I had Claude Code. The difference wasn't the technology stack or the complexity of the problem. The difference was having a tool that let me work the way I wanted to work - as a product owner and architect - instead of grinding through implementation details when I'm already mentally exhausted.

Could I have structured the js data better? Could I have used CSS variables more semantically? So many things, sure. But why twiddle when we can ship.

And hey, if you're ever driving through Nebraska (or apparently Kansas or South Dakota too) wondering which station has the 🏈🏐🏀 game, I've got an app for that now: [huskerfinder.sheetsj.com](https://huskerfinder.sheetsj.com)

Go Big Red!

{% imagePlaceholder "./src/assets/images/posts/hf-full-map-view.jpg", "HuskerFinder full map view" %}
