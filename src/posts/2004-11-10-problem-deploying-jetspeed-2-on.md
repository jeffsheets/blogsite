---
layout: post
title: Problem Deploying Jetspeed 2 on Weblogic
date: '2004-11-10T12:50:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2005-03-31T08:08:34.900-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110011263815197754
permalink: 2004/11/problem-deploying-jetspeed-2-on.html
---

Here's a quick fix for deploying Jetspeed 2 on Weblogic. First I had to fix
      a java.net.MalformedURLException. Here's the post on the BEA <a
      href="http://forums.bea.com/bea/message.jspa?messageID=200025655">dev2dev Forums</a>.
      I just needed to add this to the JAVA_OPTIONS of my startWebLogic script:<br
      /><code>-Djava.naming.provider.url=t3://localhost:nnnn<br />where nnnn is the
      port configured for this particular WL server.</code><br /><br />Next I made
      a jetspeed.ear folder under applications and exploded jetspeed.war into this. I also added a
      small application.xml file under jetspeed.ear/META-INF to setup the war module.<br
      /><br />Then I copied in these 5 jar files from jetspeed into the root of my
      ear:<br /><code>jetspeed-api-2.0-a1-dev.jar<br
      />jetspeed-commons-2.0-a1-dev.jar<br />portals-bridges-common-0.1.jar<br
      />portlet-api-1.0.jar<br />pluto-1.0.1-rc1.jar</code><br /><br
      />Then I added this line to the MANIFEST.MF file under
      jetspeed.ear/jetspeed.war/META-INF:<br /><code>Class-Path:
      jetspeed-api-2.0-a1-dev.jar jetspeed-commons-2.0-a1-dev.jar portals-bridges-common-0.1.jar
      portlet-api-1.0.jar pluto-1.0.1-rc1.jar</code><br /><br />Now I'm stuck on a
      "cannot find OJB.properties". Hope to find it soon!<br /><br /><span
      style="font-style:italic;">Edited: Mar 3, 2005 to add the following:</span><br
      /><blockquote>Hey, I've been linked from the <a
      href="http://wiki.apache.org/portals/Jetspeed2/">Jetspeed Wiki</a>, cool!<br
      /><br />Please see my follow-up posts to this issue:<br /><a
      href="http://uncommentedbytes.blogspot.com/2004/11/jetspeed-2-on-weblogic-part-2.html">Jetspeed
      2 on Weblogic - part 2</a><br /><a
      href="http://uncommentedbytes.blogspot.com/2004/11/jetspeed-2-on-weblogic-finally.html">Jetspeed
      2 on Weblogic - Finally</a><br /><a
      href="http://uncommentedbytes.blogspot.com/2004/11/jetspeed-2-on-weblogic-update-again.html">Jetspeed
      2 on Weblogic - update again</a><br /><a
      href="http://uncommentedbytes.blogspot.com/2004/11/jetspeed-fusion-struts-and-weblogic.html">Jetspeed
      Fusion, Struts, and Weblogic</a><br /><br />Also, it appears the commenting
      system on blogspot has been having some issues, so I cleaned out a few duplicate
      comments...<br /></blockquote>