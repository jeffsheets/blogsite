---
layout: post
title: Agreed, throw exception instead of return null
date: '2005-01-21T08:18:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2005-01-21T08:19:17.440-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110631710716799329
permalink: 2005/01/agreed-throw-exception-instead-of.html
---

Blaine tells us <a
      href="http://www.blainekendall.com/index.php/archives/2005/01/20/dont-use-null-or-1-in-your-unwritten-methods/">Don’t
      use null or -1 in your unwritten methods</a>, and I have to agree. He's pointing to Tim
      Bray's <a href="http://www.tbray.org/ongoing/When/200x/2005/01/18/TestingOrder">error in
      unit testing</a>.
      <br />
      <br />I have to say this is a great idea, and should be used by everyone. That is,
      instead of returning null or -1 for an unimplemented method, you should throw a
      RuntimeException ("Method has not been implemented"). Even better would be to create your own
      UnimplementedMethodException and throw that.
      <br />
      <br />Good stuff to read for breakfast!