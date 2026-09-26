---
layout: post
title: Deploy error after recompiling with struts on weblogic
date: '2005-05-18T16:12:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2005-05-19T15:36:36.486-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-111645074208656733
permalink: 2005/05/deploy-error-after-recompiling-with.html
---

I have posted the same question at BEA's <a
      href="http://forums.bea.com/bea/thread.jspa?messageID=600006095&amp;#600006095">dev2dev
      Online</a><br /><br />We are getting the following stacktrace when hitting
      the application for the first time after a redeploy. We are running on Weblogic, and the
      problem goes away after restarting the app or redeploying throught the console. Has anyone
      seen this before?<br /><br />
{% highlight "javastacktrace" %}
java.lang.NullPointerException
    at org.apache.struts.action.RequestProcessor.getServletContext(RequestProcessor.java:1136)
    at org.apache.struts.tiles.TilesRequestProcessor.processTilesDefinition(TilesRequestProcessor.java:180)
    at org.apache.struts.tiles.TilesRequestProcessor.processForwardConfig(TilesRequestProcessor.java:309)
    at org.apache.struts.action.RequestProcessor.process(RequestProcessor.java:279)
    at org.apache.struts.action.ActionServlet.process(ActionServlet.java:1482)
    at org.apache.struts.action.ActionServlet.doGet(ActionServlet.java:507)
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:740)
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:853)
    at weblogic.servlet.internal.ServletStubImpl$ServletInvocationAction.run(ServletStubImpl.java:971)
    at weblogic.servlet.internal.ServletStubImpl.invokeServlet(ServletStubImpl.java:402)
    at weblogic.servlet.internal.TailFilter.doFilter(TailFilter.java:28)
    at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:27)
    at com.proprietary.LoggingFilter.doFilter(LoggingFilter.java:69)
    at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:27)
    at com.proprietary.SecurityFilter.doFilter(SecurityFilter.java:159)
    at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:27)
    at weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.run(WebAppServletContext.java:6356)
    at weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:317)
    at weblogic.security.service.SecurityManager.runAs(SecurityManager.java:118)
    at weblogic.servlet.internal.WebAppServletContext.invokeServlet(WebAppServletContext.java:3635)
    at weblogic.servlet.internal.ServletRequestImpl.execute(ServletRequestImpl.java:2585)
    at weblogic.kernel.ExecuteThread.execute(ExecuteThread.java:197)
    at weblogic.kernel.ExecuteThread.run(ExecuteThread.java:170)
{% endhighlight %}
<br
      /><br />Edited 5/19/2004:<br />I have found a fix, and <a
      href="http://uncommentedbytes.blogspot.com/2005/05/nullpointer-on-weblogic-fixed.html">posted
      a new entry</a> about it. It dealt with our development deployment using an exploded
      ear.