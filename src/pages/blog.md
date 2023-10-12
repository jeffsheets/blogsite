---
title: Blog
description: 'All blog posts can be found here'
layout: blog
pagination:
    data: collections.posts
    size: 10
permalink: '/blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---
