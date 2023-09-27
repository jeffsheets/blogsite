---
layout: post
title: Fixed Weblogic Apache Bridge CSS Mimetype
date: '2005-09-12T09:17:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2005-09-12T09:19:05.766-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-112653467199712579
permalink: 2005/09/fixed-weblogic-apache-bridge-css.html
---

After switching our jsp pages to render in w3c transitional mode (by adding
      the doctype to our pages), the css files stopped working in firefox. I found that the css
      files were being served with an incorrect mime-type of text/html instead of the required
      text/css from the firefox page info. (IE apparently guesses the mimetype for you, which is
      against the w3c spec but get's your pages to show correctly.)<br /><br />Our first
      check was the Apache config, which appeared correct. Next was a web search where I found some
      links to the apache weblogic bridge. The bridge incorrectly places a text/html mimetype on
      everything. We fixed this by putting the mime mapping into the web.xml file of our webapp.
      Everything works beautifully again!<br /><br />Here's the mapping that needs to be
      added:<br /><code><br />&lt;mime-mapping><br
      />&nbsp;&nbsp;&lt;extension>css&lt;/extension><br
      />&nbsp;&nbsp;&lt;mime-type>text/css&lt;/mime-type><br
      />&lt;/mime-mapping><br /></code>