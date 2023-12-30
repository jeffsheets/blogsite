---
title: 'VSCode Pasting 11ty Images'
description: 'Creating content locally like a hosted editor'
date: '2023-11-21T09:00:00.000-05:00'
tags:
- 11ty
- eleventy
- VSCode
---

One sticky reason it took me a long time to switch from a hosted blog platform (Blogger/Wordpress/Medium/etc) to something self-hosted (like 11ty/hugo/jekyll/etc) was the lack of a nice interface to create content. Sure writing up markdown is easy and intuitive enough, but the lack of paste-able images was a big drawback.

In Blogger you could easily screenshot or copy/paste and image and it will embed the base64 image into the editor. I think it would even create a separate linkable file if the image was large.

My first thought was maybe using the in-browser Github editor. You can paste an image and it will auto-create a linkable user-content file for you. However you can't customize the location of this file into your repo, so the file would be hosted forever at a [github user-content link](https://github.com/orgs/community/discussions/23840) (or until github gets tired of hosting it).

---

## Initial Solution

As of mid-2023 - using VSCode as the editor, you can paste an image into the editor and it will create a file for you and link it into the markdown! Even better, you can also customize the location of the pasted file in the workspace settings. I setup mine to be:
```
**/*    ${documentWorkspaceFolder}/src/assets/images/posts/${documentBaseName}/${fileName}
```

This gets us close, by storing the image into my images/posts folder, and inserting the markup into the markdown file: \
`![My VSCode Image Paste Settings](../assets/images/posts/2023-11-21-vscode-pasting-11ty-images/image-1.png)`

For now I'll have to then replace the markdown with some custom liquid shortcode (and fix the relative path) like: {% raw %} \
`{% imagePlaceholder "./src/assets/images/posts/2023-11-21-vscode-pasting-11ty-images/image-1.png", "My VSCode Image Paste Settings" %}`
{% endraw %}

Look at this nicely pasted image of my settings:
{% imagePlaceholder "./src/assets/images/posts/2023-11-21-vscode-pasting-11ty-images/image-1.png", "My VSCode Image Paste Settings" %}

Kinda nice to easily snapshot [browser docs](https://code.visualstudio.com/docs/languages/markdown#_inserting-images-and-links-to-files) too:
{% imagePlaceholder "./src/assets/images/posts/2023-11-21-vscode-pasting-11ty-images/image.png", "VSCode Image Paste Docs" %}

---

## Next steps

I need to take this one step further and have a markdown processor so the extra shortcode step isn't needed. Looks like this [markdown-it-eleventy-img](https://github.com/solution-loisir/markdown-it-eleventy-img) plugin might be the answer? I'll follow-up in the next post...

-- To Be Continued --