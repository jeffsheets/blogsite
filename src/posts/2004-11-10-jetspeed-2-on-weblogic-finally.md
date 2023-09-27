---
layout: post
title: Jetspeed 2 on Weblogic - Finally
date: '2004-11-10T16:44:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2004-11-10T16:48:40.450-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110012692045062720
permalink: 2004/11/jetspeed-2-on-weblogic-finally.html
---

Wow, it works!
      <br />
      <br />To get past the issue in my last post, I had to add each of the demo wars into my
      application.xml. This is a side effect of creating the ear to put my wars into.
      <br />
      <br />Also, I found <a href="http://wiki.apache.org/portals/Jetspeed2/Fusion">this
      page</a> that answered my next error, by telling me to put the 5 jetspeed jars into a
      shared lib, and add this shared lib to my CLASSPATH in the startWebLogic script. I now have
      most of the portlets working, but I might move my portal outside the ear and give it a try. It
      seems like the portal should run alongside my ear, but I'm not sure if that will work...