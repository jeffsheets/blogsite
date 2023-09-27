---
layout: post
title: Using c:param doesn't work in portlets
date: '2004-12-22T10:51:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2004-12-22T10:56:57.990-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110373427170907538
permalink: 2004/12/using-cparam-doesnt-work-in-portlets.html
---

For some reason I cannot get a
      <br /><code>&lt;jsp:include page="include/mypage.jsp"&gt;
      <br />&nbsp;&nbsp;&lt;jsp:param name="jeffstest" value="26"/&gt;
      <br />&lt;/jsp:include&gt;</code>
      <br />or
      <br /><code>&lt;c:import url="include/mypage.jsp"&gt;
      <br />&nbsp;&nbsp;&lt;c:param name="jeffstest" value="26"/&gt;
      <br />&lt;/c:import&gt;</code>
      <br />to work inside of a portlet. The page includes okay, but the param is not passed
      to the request parameters successfully. The odd thing is that the param does get into the
      querystring!
      <br />
      <br />So for now, my workaround is to do:
      <br /><code>&lt;c:set var="jeffstest" value="26" scope="request"/&gt;
      <br />&lt;c:import url="include/mypage.jsp"/&gt;</code>
      <br />
      <br />I'd rather use the c:param tag, but for whatever reason it has problems inside a
      portlet. I'm using Jetspeed 1.6 Fusion (JSR-168 enabled), in case anyone is wondering.