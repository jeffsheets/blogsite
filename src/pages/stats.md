---
title: Uncommented Bytes Stats and Metrics
permalink: /stats/index.html
layout: page
---

## Top 8 Pages (last 3 months)

<ul class="top-pages">
  {% for page in umami.topPages %}
    <li>
        <a href="{{ page.path }}">{{ page.path }}</a>
    </li>
  {% endfor %}
</ul>

## Post Stats

See how I'm posting over time (thanks to the [postgraph plugin](https://postgraph.rknight.me)):
{% postGraph collections.posts %}