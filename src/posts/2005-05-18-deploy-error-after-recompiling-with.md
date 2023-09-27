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
      seen this before?<br /><br /><code><br
      />java.lang.NullPointerException<br /> at
      org.apache.struts.action.RequestProcessor.getServletContext(RequestPr<br
      />ocessor.java:1136)<br /> at
      org.apache.struts.tiles.TilesRequestProcessor.processTilesDefinition(<br
      />TilesRequestProcessor.java:180)<br /> at
      org.apache.struts.tiles.TilesRequestProcessor.processForwardConfig(Ti<br
      />lesRequestProcessor.java:309)<br /> at
      org.apache.struts.action.RequestProcessor.process(RequestProcessor.ja<br />va:279)<br
      /> at org.apache.struts.action.ActionServlet.process(ActionServlet.java:148<br
      />2)<br /> at
      org.apache.struts.action.ActionServlet.doGet(ActionServlet.java:507)<br /> at
      javax.servlet.http.HttpServlet.service(HttpServlet.java:740)<br /> at
      javax.servlet.http.HttpServlet.service(HttpServlet.java:853)<br /> at
      weblogic.servlet.internal.ServletStubImpl$ServletInvocationAction.run<br
      />(ServletStubImpl.java:971)<br /> at
      weblogic.servlet.internal.ServletStubImpl.invokeServlet(ServletStubIm<br
      />pl.java:402)<br /> at
      weblogic.servlet.internal.TailFilter.doFilter(TailFilter.java:28)<br /> at
      weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.ja<br />va:27)<br
      /> at com.proprietary.LoggingFilter.doFilter(LoggingFilter.java:69)<br /> at
      weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.ja<br />va:27)<br
      /> at com.proprietary.SecurityFilter.doFilter(SecurityFilter.java:159)<br /><br
      /> at weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.ja<br
      />va:27)<br /> at
      weblogic.servlet.internal.WebAppServletContext$ServletInvocationActio<br
      />n.run(WebAppServletContext.java:6356)<br /> at
      weblogic.security.acl.internal.AuthenticatedSubject.doAs(Authenticate<br
      />dSubject.java:317)<br /> at
      weblogic.security.service.SecurityManager.runAs(SecurityManager.java:<br />118)<br
      /> at weblogic.servlet.internal.WebAppServletContext.invokeServlet(WebAppSe<br
      />rvletContext.java:3635)<br /> at
      weblogic.servlet.internal.ServletRequestImpl.execute(ServletRequestIm<br
      />pl.java:2585)<br /> at
      weblogic.kernel.ExecuteThread.execute(ExecuteThread.java:197)<br /> at
      weblogic.kernel.ExecuteThread.run(ExecuteThread.java:170)<br /></code><br
      /><br />Edited 5/19/2004:<br />I have found a fix, and <a
      href="http://uncommentedbytes.blogspot.com/2005/05/nullpointer-on-weblogic-fixed.html">posted
      a new entry</a> about it. It dealt with our development deployment using an exploded
      ear.