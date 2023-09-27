---
layout: post
title: Jetspeed 2 on Weblogic - part 2
date: '2004-11-10T14:47:00.000-06:00'
author: Jeff Sheets
tags:
modified_time: '2004-11-10T14:55:43.533-06:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-110012014353326750
permalink: 2004/11/jetspeed-2-on-weblogic-part-2.html
---

Well I have gotten a little farther since my last post. First I found <a
      href="http://www.mail-archive.com/jetspeed-dev@jakarta.apache.org/msg16644.html">this
      thread</a> explaining how to get past the "cannot find OJB.properties" issue.
      <br />
      <br />Then I started getting this:
      <br /><code>java.lang.RuntimeException: Failed to initialize prefs api.
      java.lang.InternalError: Can't instantiate Preferences factory
      java.lang.ClassNotFoundException:
      org.apache.jetspeed.prefs.impl.PreferencesFactoryImpl</code>
      <br />and found this <a
      href="http://wiki.apache.org/portals/Jetspeed2/PrefsClassloaderIssuesAndSdk14">related
      post</a> which links to a <a
      href="http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=5012893">bug report</a> on
      the sun website detailing the issue. This told me to stop using the jdk that is bundled with
      weblogic and use the j2sdk1.4.2_03 that is already on my machine.
      <br />
      <br />Well after I pointed to this jdk, I started getting this issue:
      <br /><code>Cannot load Implicit TLDs java.lang.ClassNotFoundException:
      weblogic/apache/xerces/parsers/SAXParser</code>
      <br />which I have seen before. But this time I figured out a fix. In the endorsed
      directory of j2sdk1.4.2_03 I found some sax, xalan, and xerces jars. I deleted those and the
      sax parser problem went away.
      <br />
      <br />Now I have to figure out why my portlets show this:
      <br /><code> javax.portlet.PortletException: Failed to find Servlet context for
      Portlet Application: /localeselector at
      org.apache.jetspeed.container.invoker.ServletPortletInvoker.invoke(ServletPortletInvoker.java:184)
      at
      org.apache.jetspeed.container.invoker.ServletPortletInvoker.render(ServletPortletInvoker.java:124)
      at org.apache.pluto.PortletContainerImpl.renderPortlet(PortletContainerImpl.java:103) at
      org.apache.jetspeed.container.JetspeedPortletContainerWrapper.renderPortlet(JetspeedPortletContainerWrapper.java:88)
      at org.apache.jetspeed.aggregator.impl.RenderingJob.run(RenderingJob.java:109) at
      org.apache.jetspeed.aggregator.impl.Worker.run(Worker.java:142)</code>