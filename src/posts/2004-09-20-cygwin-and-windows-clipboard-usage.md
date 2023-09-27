---
layout: post
title: Cygwin and Windows Clipboard Usage
date: '2004-09-20T12:59:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2004-09-20T12:59:43.676-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-109570318367819649
permalink: 2004/09/cygwin-and-windows-clipboard-usage.html
---

An option that I always forget about when installing cygwin is how to
      enable usage of the windows clipboard. For some reason it seems hard to google for (probably
      my laziness), so I'm documenting it here.
      <br />
      <br />To enable usage of the windows clipboard from within cygwin, use the -clipboard
      option from the xwin.exe command. Previously you needed to use xwinclip (or similar), but it
      is now integrated within Cygwin/X...