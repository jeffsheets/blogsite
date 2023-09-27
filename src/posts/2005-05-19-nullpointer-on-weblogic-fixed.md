---
layout: post
title: nullpointer on weblogic fixed
date: '2005-05-19T15:32:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2005-05-19T15:34:01.700-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-111653476051847220
permalink: 2005/05/nullpointer-on-weblogic-fixed.html
---

I have fixed the problem from my <a
      href="http://uncommentedbytes.blogspot.com/2005/05/deploy-error-after-recompiling-with.html">last
      post</a>, and put the answer here:<a
      href="http://forums.bea.com/bea/thread.jspa?messageID=600006213&amp;#600006213">dev2dev
      Online</a><br /><br /><blockquote>It seems that weblogic was not
      noticing the changes so it was not redeploying. This is because we are exploding our ear in
      development. I changed our ant script to always overwrite the META-INF directory containing
      the application.xml file. This is forcing weblogic to refresh the application correctly (like
      it would if an entire ear file had changed), and the problem is now gone.</blockquote>