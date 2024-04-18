---
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag | slugify }}/
layout: page
eleventyComputed:
    seo:
        title: '{{ tag | slugify }} Tagged Posts | {{ meta.siteName }}'
---
<h1 class="page-title">Tagged “{{ tag }}”</h1>

<ul>
  {% set taglist = collections[tag] %}
  {% for post in taglist | reverse %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </li>
  {% endfor %}
</ul>
<hr />
<details open>
  <summary>All Tags</summary>
  <div class="cluster" style="gap: var(--space-s);">
    {% for tag in collections.all | getAllTags | filterTagList | sort %}
  
      <a href="/tags/{{ tag | slugify }}/" class="post-tag">{{ tag }}</a>
  
    {% endfor %}
  </div>
</details>