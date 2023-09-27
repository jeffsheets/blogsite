---
layout: post
title: CSS word-break and word-wrap
date: '2012-08-06T07:04:00.000-05:00'
author: Jeff Sheets
tags:
- css
- html
modified_time: '2012-08-05T22:47:48.852-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-5004847283551862226
permalink: 2012/08/css-word-break-and-word-wrap.html
---

<br />
      Finding a cross-browser CSS solution to force breaks in long words inside of table-cells is
      not an easy task. My issue was specifically with email addresses formatted like
      reallyreally.long.email.addressthatdoesnotbreak@fakeemail.com. The snag is that support is
      decent inside of block-level elements like divs, but only hacks seem to exist for table
      cells.<br />
      <br />
      The widely supported <a
      href="https://developer.mozilla.org/en/CSS/white-space">white-space</a> will instruct
      the browser to wrap on normal wrapping characters, but the browsers will not break a word.
      There are two newer CSS properties to try: <a
      href="https://developer.mozilla.org/en/CSS/word-wrap">word-wrap</a> and <a
      href="https://developer.mozilla.org/en/CSS/word-break">word-break</a>.<br />
      <br />
      <a href="https://developer.mozilla.org/en/CSS/word-break">word-break</a>:break-all
      will force a break anywhere but ignores spaces. It works well if you know your table cell will
      only contain a single term or word, and you don’t care about wrapping on commas, hyphens, or
      spaces.<br />
      <br />
      <a href="https://developer.mozilla.org/en/CSS/word-wrap">word-wrap</a>:break-word
      will honor commas, hyphens, and spaces to wrap first and then will force a break in the middle
      of words when needed. The catch is it only works cross-browser on block-level elements and not
      on table cells. Also a width or max-width must be specified.<br />
      <br />
      One promising hack sets a table to be <a
      href="http://stackoverflow.com/questions/1258416/word-wrap-in-a-html-table">table-layout:fixed</a>
      but this did not work with the jQuery datatables plugin.<br />
      <br />
      So here is my cross browser solution, tested in Chrome, Firefox, and IE9. It unfortunately
      requires wrapping your td contents inside of a div. But it does work with the jQuery
      datatables plugin.<br />
      <br />
      <code><br />
      CSS:<br />
      /* forces wraps in middle of words when necessary */<br />
      div.force-wrap {<br />
      &nbsp; white-space: normal;<br />
      &nbsp; word-wrap: break-word;<br />
      }<br />
      td.email,<br />
      td.email div.force-wrap {<br />
      &nbsp; width: 30em;<br />
      }<br />
      <br />
      Html:<br />
      &lt;table>&lt;tbody><br />
      &lt;tr><br />
      &nbsp; &lt;td class="”email”"><br />
      &lt;div class="”forcewrap”"><br />
      reallyreally.long.email.addressthatdoesnotbreak@fakeemail.com,
      another.email.addressthatdoesnotbreak@fakeemail.com<br />
      &lt;/div><br />
      &lt;/td>&lt;/tr><br />
      &lt;/tbody>&lt;/table><br />
      </code><br />
      <br />
      <br />
      Additional References<br />
      <br />
      <a
      href="https://bugs.webkit.org/show_bug.cgi?id=43917">https://bugs.webkit.org/show_bug.cgi?id=43917</a><br
      />
      <a
      href="http://blog.kenneth.io/blog/2012/03/04/word-wrapping-hypernation-using-css/">http://blog.kenneth.io/blog/2012/03/04/word-wrapping-hypernation-using-css/</a><br
      />
      <a
      href="http://petesbloggerama.blogspot.com/2007/02/firefox-ie-word-wrap-word-break-tables.html">http://petesbloggerama.blogspot.com/2007/02/firefox-ie-word-wrap-word-break-tables.html</a><br
      />
      <div><br />
      </div>