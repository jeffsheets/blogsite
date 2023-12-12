---
title: 'IntelliJ Markdown and Images'
description: 'Improving the local 11ty blog DX'
date: '2023-12-12T09:00:00.000-05:00'
tags:
- 11ty
- IntelliJ
- Markdown
---

IntelliJ is my go-to coding editor - and even though I tried [blogging with VSCode](https://sheetsj.com/blog/vscode-pasting-11ty-images/) my mind kept opening IntelliJ so I stopped fighting it. IntelliJ needs a few Markdown settings to make the developer experience friendly for content creation -- and especially pasting of images directly into md files. Once configured the overall usability flow is decent!

---

## IntelliJ Markdown Plugin

The [built-in markdown plugin](https://www.jetbrains.com/help/idea/markdown.html) is fine, and good enough for occasional Readme file updates and the like. It handles minimal formatting okay and even allows for pasting in images. But the image location is not customizable so it'll drop next to the file being edited. Leaving room for improvement when wanting to use markdown more intensively for documentation (hello [docusaurus](https://docusaurus.io)) or blogposts.

I found and installed the community developed [Markdown Navigator Enhanced plug-in](https://github.com/vsch/idea-multimarkdown)

{% imagePlaceholder "./src/assets/images/posts/intellij-pasting/intellij-markdown-navigator-enhanced.png", "IntelliJ Markdown Navigator enhanced plugin options" %}

It has a ton more options for editing, parsing, and styling Markdown files. 

{% imagePlaceholder "./src/assets/images/posts/intellij-pasting/markdown-options.png", "IntelliJ Markdown plugin options" %}

A few settings I found helpful:
- **Soft wrap enabled** - to allow for composing content to flow without worrying about entering newlines to view. I also updated the margin to 120 in the Editor > Code Style section
- **Jekyll front matter** - enable this extension in the parser section so the front matter is styled as yml
- **Parser profile** - the "Custom" default seems to match closely to 11ty usage of [markdown-it](https://markdown-it.github.io/markdown-it/) as a mostly CommonMark w/ a few Github flavors added in. i'll continue to tweak this over time
- **Chromium Embdedded** - preview browser instead of the default java swing version

## Image Options

At first I was confused where the "pasting image" options were. To get them to show up, first I had to paste an image into the markdown text. Then the screen full of detailed options appeared:

{% imagePlaceholder "./src/assets/images/posts/intellij-pasting/intellij-markdown-image-options.png", "IntelliJ Markdown plugin image options" %}

This works great to store the image in the `/src/assets/images/posts/<postname>/` folder! And inserts a markdown image tag into the document.

For now I'll still have to replace the markdown with some custom liquid shortcode like: {% raw %} \
`{% imagePlaceholder "./src/assets/images/posts/intellij-pasting/intellij-markdown-image-options.png", "IntelliJ Markdown plugin image options" %}`
{% endraw %}

---

## Developer Experience

I'm much more comfortable editing in IntelliJ now vs VSCode. I know that is my own personal preference, but the beauty of hosting my own site is also being able to tailor the Developer Experience any way I want! The comfort level of building and producing my own product brings so much joy compared to the "locked-in service provider" feeling that I had for years previously.

Starting to really get that [personal site as a worry-stone](https://ethanmarcotte.com/wrote/let-a-website-be-a-worry-stone/) feeling 🤗

Still need to take this one step further and have a markdown processor so the extra shortcode step isn't needed...

-- To Be Continued (again) --