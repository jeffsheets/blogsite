---
layout: post
title: Eclipse Mac OS X CVS Update Bug?
date: '2006-05-25T09:15:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-05-25T09:15:37.503-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-114856653667067469
permalink: 2006/05/eclipse-mac-os-x-cvs-update-bug.html
---

So I go into Eclipse (3.1.2) on my OS X (10.3.9) box and do a Team Update
      from CVS. Anytime that a file has been deleted from cvs by someone else's commit I get this
      error:<br /><blockquote>Problems encountered while deleting
      resources.</blockquote><br />I get this error for EACH file that was deleted. Then
      I have to open the properties on each file and unselect Read Only. After this I can Team |
      Override And Update to remove the file.<br /><br />Does this happen to anyone else
      on their Mac? I've never had this issue on Windows. I think the bug is in OS X holding the
      file as read only and locked, but I don't know. It's very frustrating and time consuming to
      deal with.