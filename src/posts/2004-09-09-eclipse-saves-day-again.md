---
layout: post
title: Eclipse Saves The Day (Again!)
date: '2004-09-09T08:44:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-09-09T08:46:38.776-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-109473744826642855
permalink: 2004/09/eclipse-saves-day-again.html
---

I found a new "must use" feature in Eclipse, which comes standard but is
      turned off by default. Of course, I found it because I was trying to fix a bug in our code.
      The bug ended up being similar to this:
      <br /><code>
      <br />if (something != null);
      <br />{
      <br /> i++;
      <br />}
      <br /></code>
      <br />Notice that extra semi-colon at the end of the if statement? That burned us.
      (Don't mention the odd "brace on the next line" coding standard that is used the the project I
      just joined. I don't like it either.)
      <br />
      <br />After fixing it, we wondered if Eclipse could show it as a warning. Of course,
      Eclipse comes to the rescue again. Under Preferences, select Java | Compiler. Then on the
      Style tab set "Empty Statement" from Ignore to Warning. This coding mistake could cause such
      large errors, that I really wish this was a default selection. In fact, after turning on this
      warning, we immediately found another bug of the exact same kind!
      <br />
      <br />Definitely a bit to remember!