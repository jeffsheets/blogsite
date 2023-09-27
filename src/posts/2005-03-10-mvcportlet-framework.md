---
layout: post
title: MVCPortlet Framework
date: '2005-03-10T08:45:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2005-03-10T08:45:54.243-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-111046595424202231
permalink: 2005/03/mvcportlet-framework.html
---

I have just finished reading about the <a
      href="http://today.java.net/pub/a/today/2005/03/08/mvcportlet.html">MVCPortlet
      Framework</a>. This seems like a great framework for developing portlets! Like struts
      (or WebWork, or Spring MVC, or whatever) it is a MVC model for presentation data. But unlike
      all of the others, it is made specifically to work in a JSR-168 portal. We have been using the
      struts-bridge from apache jetspeed to write struts applications to work in a portal. While the
      bridge is nice, it has a key bug that seems to arise because the struts-bridge is a hack to
      get it working in a portal (specifically the "edit" mode button is broken). MVCPortlet seems
      like a much cleaner portal development MVC model.