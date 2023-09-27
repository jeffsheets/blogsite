---
layout: post
title: Jetspeed 2 on Weblogic - update again
date: '2004-11-11T11:48:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2004-11-11T11:53:42.190-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110019562218422859
permalink: 2004/11/jetspeed-2-on-weblogic-update-again.html
---

Now I'm attempting to run jetspeed.war alongside my other wars and ears,
      while not running it in the same ear as everything else. This saves me from having to explode
      my ear, if I can get it to work.
      <br />
      <br />So far I've seen that the sample apps can be deployed along side the war, with the
      small addition that all of these wars MUST have this in the web.xml file:
      <br /><code>
      <br /> &lt;servlet&gt;
      <br /> &lt;servlet-name&gt;JetspeedContainer&lt;/servlet-name&gt;
      <br /> &lt;display-name&gt;Jetspeed Container&lt;/display-name&gt;
      <br /> &lt;description&gt;MVC Servlet for Jetspeed Portlet
      Applications&lt;/description&gt;
      <br />
      &lt;servlet-class&gt;org.apache.jetspeed.container.JetspeedContainerServlet&lt;/servlet-class&gt;
      <br /> &lt;/servlet&gt;
      <br />
      <br /> &lt;servlet-mapping&gt;
      <br /> &lt;servlet-name&gt;
      <br /> JetspeedContainer
      <br /> &lt;/servlet-name&gt;
      <br /> &lt;url-pattern&gt;
      <br /> /container/*
      <br /> &lt;/url-pattern&gt;
      <br /> &lt;/servlet-mapping&gt;</code>
      <br />
      <br />Some of the sample apps were missing this, and it caused problems. But now I'm a
      bit farther. Next I need to see if wars inside an ear can be brought up by this external
      jetspeed.war. Very cool stuff so far! I love it!