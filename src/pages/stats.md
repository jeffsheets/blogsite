---
title: Uncommented Bytes Statistics
permalink: /stats/index.html
layout: page
---

## 🔥 Posts (hits/day ~ 3 months)

{% for hot in stats.hotPosts %}
1. [{{ hot.path }}]({{ hot.path }})
{% endfor %}

## 📈 Posts (total hits ~ 3 months)

{% for top in stats.topPosts %}
1. [{{ top.path }}]({{ top.path }})
{% endfor %}

## Posting Days Over Time

See how I'm posting over time (thanks to the [postgraph plugin](https://postgraph.rknight.me)):
{% postGraph collections.posts %}