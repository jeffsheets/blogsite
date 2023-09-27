---
layout: post
title: Groovy OJUG Talk last night
date: '2006-07-19T15:32:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-07-19T15:35:19.666-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-115334114984797544
permalink: 2006/07/groovy-ojug-talk-last-night.html
---

Last night at <a href="http://ojug.org/">OJUG</a> (Omaha Java
      Users Group), Scott Hickey gave an awesome talk over <a
      href="http://groovy.codehaus.org/">Groovy</a>. I wish I had a link to his website,
      but I didn't see one. He is the lead on the groovy Eclipse plug-in, and is currently finishing
      an article for the <a href="http://www-128.ibm.com/developerworks/">IBM
      DeveloperWorks</a> <a
      href="http://www-128.ibm.com/developerworks/views/java/libraryview.jsp?search_by=practically+groovy:">Practically
      Groovy</a> series covering groovy and spring. He's been writing production groovy code
      for a few years on a mission critical financial app.<br /><br />He covered some
      great code examples comparing java and groovy. Things seem to be written much easier (as like
      most dynamically typed languages), and it's cool that groovy runs in the same jvm as the rest
      of the code. From what I could tell, the syntax looks a lot like Ruby.<br /><br
      />I liked his example showing how he did some Test First development by using a Map in his
      test, and later replaced with an object because of the dynamic typing.<br /><br
      />He stressed that groovy by design uses BigDecimal behind the scenes, which is great when
      used in math statements. 1.1 + .1 should = 1.2, but in java it equals 1.19999999 except when
      using BigDecimal. He had some great examples here too.<br /><br />He mentioned
      catching exceptions only when you want to. This was a bit scary to me, but I think in practice
      I might agree.<br /><br />As for his Eclipse groovy plugin... They are looking for
      some help in finishing the code completion portion. It's a difficult task in a dynamically
      typed language. I'd advise him to look at the javascript Eclipse plugins. The latest ones try
      to guess what object you are code completing by remembering previous methods that you have
      called. This works surpising well, and may be enough for them to use IMHO....<br
      /><br />Thanks to Scott for a great talk, and to <a
      href="http://blog.secosoft.net/">Matt</a> for pulling it all together...