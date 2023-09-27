---
layout: post
title: Enum Serialization with Weblogic EJB Client
date: '2008-07-30T15:28:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2008-07-30T15:28:54.576-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-3997810548919577988
permalink: 2008/07/enum-serialization-with-weblogic-ejb.html
---

I was trying to setup an ejb client to connect to an ejb running on a
      Weblogic 9 app server. I could connect fine, but kept getting a Mismatched serialization uids
      error on a Java 5 Enum class. After some digging I found <br /><a
      href="http://saloon.javaranch.com/cgi-bin/ubb/ultimatebb.cgi?ubb=get_topic&amp;f=40&amp;t=003956">a
      fix on JavaRanch</a>. For whatever reason using the wlclient.jar will not work when
      serializing enums, but using the full blown weblogic.jar is fine. I'm going to ignore the
      details on this one and just move along, but maybe someone else understands the
      problem/workaround/fix better?