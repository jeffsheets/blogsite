---
title: Uncommented Bytes Stats and Metrics
permalink: /stats/index.html
layout: page
---

## Top 7 Posts (last 3 months)

{% for page in umami.topPages %}
- [{{ page.path }}]({{ page.path }})
{% endfor %}

## Post Stats

See how I'm posting over time (thanks to the [postgraph plugin](https://postgraph.rknight.me)):
{% postGraph collections.posts %}