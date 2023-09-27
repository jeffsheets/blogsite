---
layout: post
title: Multiple Firefox Session
date: '2005-01-14T08:36:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2005-01-14T08:36:20.306-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110571338030832214
permalink: 2005/01/multiple-firefox-session.html
---

I found some posts about creating multiple firefox sessions. But they all
      require you to set MOZ_NO_REMOTE=1 in your environment before starting a window. This forces
      each window to use a different profile. All I want is each window to use separate session
      cookies, or even allow this in separate tabs (could be very hard to get right).