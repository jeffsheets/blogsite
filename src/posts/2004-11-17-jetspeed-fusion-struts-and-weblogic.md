---
layout: post
title: Jetspeed Fusion, Struts, and Weblogic
date: '2004-11-17T11:45:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2004-11-17T11:45:22.813-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110071352281218532
permalink: 2004/11/jetspeed-fusion-struts-and-weblogic.html
---

I've finally fixed Jetspeed 1.6 Fusion (JSR-168 enabled Jetspeed) to work
      with struts on Weblogic. This required a code change in Jetspeed to get around a Weblogic bug,
      but it works! The details are in <a
      href="http://www.mail-archive.com/jetspeed-user%40jakarta.apache.org/msg14210.html">this
      thread</a> on the apache jetspeed mailing list.