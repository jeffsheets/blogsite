---
layout: post
title: Which Portal? Apache Jetspeed, of course!
date: '2004-07-01T09:22:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-02-20T23:22:54.586-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-108869177834250670
permalink: 2004/07/which-portal-apache-jetspeed-of-course.html
---

Punit asked <a
      href="http://jroller.com/page/portlets/20040701#which_open_source_portal_server">Which Open
      Source Portal Server?</a>, and here is my answer:<br /><br />He lists the
      top contenders in the open source portal market as:<br />eXo<br />Gridsphere<br
      />uPortal<br />Apache Jakarta Jetspeed 2<br />Liferay<br /><br />I
      would mod it to change Jetspeed to version 1 and add Jahia.<br /><br />About 5
      months ago I did a fairly extensive evaluation of the portal market. I chose Apache Jetspeed
      1. We are running 1.4 now, but are migrating to 1.5 soon and 2.0 when it is finally released.
      We are so happy with Jetspeed! At the time of my evaluation it was miles ahead of Liferay,
      eXo, and uPortal for our purposes.<br /><br />eXo looks promising, but is/was
      still in its infancy. uPortal is great for universities, but we need an application portal not
      an enterprise/university portal. We don't need email/calendar/todo lists. What we need is a
      framework so our applications can utilize portlets for extensibility and customization.
      Liferay looked like it needed a new architecture regarding JSR 168.<br /><br />For
      us it came down to Jahia and Jetspeed. Jahia is a very nicely done portal that runs on the
      Jetspeed platform. However I had problems running it in Weblogic. Also Jetspeed was more
      customizable for our purposes. It handles customization of data and user views. It is very
      easy to get running and very easy to program for. We use a blend of Jetspeed MVC and Struts
      for our architecture components. We have been able to extend sections of the Jetspeed code for
      our purposes too! The Apache Jakarta name is a huge seller in our government environment, and
      this went a long way in helping me sell the portal above Weblogic's Portal, TIBCO, Plumtree,
      and Vignette.<br /><br />Jetspeed 2 looks to be great when it is stable and
      released. Until then, Jetspeed 1 is all we need. I should do another entry on JSR 168 and why
      that is not important to us, yet. Jetspeed essentially shelters us from the current
      hype.<br /><br />[Update: 12/21/2004] I would now upgrade this to say, pick <a
      href="http://www.mail-archive.com/jetspeed-user@jakarta.apache.org/msg14154.html">Jetspeed
      1.6 Fusion</a> if you want JSR-168 portlets when migrating from the original Jetspeed.
      In this way, we can still support our original Jetspeed portlets until they are fully migrated
      to JSR-168 versions. I would also choose Jetspeed 1.6 Fusion for a new project, but only
      develop JSR-168 Portlets for it. This way you can easily migrate to Jetspeed 2 when it is
      final and stable. Take a look at the <a
      href="http://cvs.apache.org/viewcvs.cgi/jakarta-jetspeed-2/portals-bridges/struts/README.txt?view=markup">struts
      portal bridge</a>, that can be deployed on any portal to use struts in developing your
      portal apps.<br /><br />[Update: 2/20/2006] Wow, I'm impressed that people are
      still hitting this page quite regularly! Some of you may also be interested in my thread
      related directly to deploying Jetspeed on Weblogic: <a
      href="http://uncommentedbytes.blogspot.com/2005/03/jetspeed-on-weblogic-faq.html">Jetspeed
      on Weblogic FAQ</a>