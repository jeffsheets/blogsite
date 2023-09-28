# sheetsj.com blog

The content behind the new sheetsj.com blog, after migrating it over from a super old blogger account

## Development

```
npm start
```

### Creating a production build

```
npm run build
```

### Migrating Blogger to 11ty

- Export blog content backup from Blogger
- Run [jekyll Blogger import](https://import.jekyllrb.com/docs/blogger/)
- Rename all .html posts to .md with `find . -name '*.html' -exec sh -c 'mv "$0" "${0%.html}.md"' {} \;`
- To keep blogger URLs working, update permalinks to match the old blogger path with:
  - Replace all `blogger_orig_url: https://www.sheetsj.com/` with `permalink: `

## Built with Eleventy Excellent

Thanks to the devs of the [eleventy-excellent project](https://github.com/madrilene/eleventy-excellent) for the template!

**Eleventy-Excellent starter includes:**

- The whole CSS workflow as suggested by buildexcellentwebsit.es
- Accessible site navigation, editable in `src/_data/navigation.js`
- Image optimization with Eleventy-img _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-an-image/))_
- Youtube embed with lite-youtube _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-a-video/))_
- Easy resource fetching with eleventy-fetch _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-fetched-content/))_
- Syntax highlighting via eleventy-plugin-syntaxhighlight _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-some-code/))_
- Advanced markdown handling _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-all-the-markdown/))_
- 301 redirects for Netlify _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-301-redirects/))_
- Automatically generated Open Graph images for blog posts _([see blog post](https://eleventy-excellent.netlify.app/blog/open-graph-images/))_
- SEO basics (XML-sitemap, metadata)
- dayjs handling dates & times
- Bundling via esbuild
- RSS feed
- Links to social networks in footer
- Mastodon domain verification snippet